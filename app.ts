import * as fs from 'fs';
import * as readline from 'readline-sync';

function main(): void {
  while (true) {
    console.log('⚾ 숫자야구를 시작합니다! ⚾');
    console.log('1. 로그인');
    console.log('2. 회원가입');
    const loginInput: string = readline.question();
    if (loginInput === '1') {
      try {
        fs.readFileSync('./test.txt', 'utf8');
      } catch {
        console.log('회원가입 먼저 해주세요.');
        break;
      }
      const userParse: any = JSON.parse(fs.readFileSync('./test.txt', 'utf8'));
      console.log();
      console.log('아이디를 입력해주세요.');
      const loginInput: string = readline.question();

      const filterUser: any = userParse.filter(
        (el: any) => el.nickName === loginInput
      );

      if (filterUser.length === 0) {
        console.log('🤔 회원정보가 없습니다. 회원가입 먼저 해주세요. 🤔');
      } else {
        console.log(`😍 환영합니다, ${filterUser[0].nickName}님 😍`);
        while (true) {
          console.log();
          console.log('메뉴를 선택해주세요.');
          console.log('1. 게임시작');
          console.log('2. 내 최고기록 보기');
          console.log('3. 종료');
          const selectMenu = readline.question();
          console.log();

          if (selectMenu === '1') {
            gameStart(filterUser[0]);
          } else if (selectMenu === '2') {
            console.log(searchBestRecord(filterUser[0]));
          } else {
            console.log('게임을 종료합니다.');
            console.log();
            break;
          }
        }
      }
    } else if (loginInput === '2') {
      signup();
      console.log();
    } else {
      console.log('1번과 2번 중에서 골라주세요.');
      console.log();
    }
  }
}

function signup(): void {
  console.log();
  console.log('📝 회원가입 하실 아이디를 입력해주세요. 📝');
  const nickName: string = readline.question();

  try {
    let filterOnlyNickName = JSON.parse(
      fs.readFileSync('./test.txt', 'utf8')
    ).map((el: any) => el.nickName);

    if (filterOnlyNickName.includes(nickName)) {
      console.log('이미 존재하는 아이디 입니다.');
    } else if (
      isNaN(Number(nickName)) &&
      !filterOnlyNickName.includes(nickName)
    ) {
      let parseNickName: Array<object> = JSON.parse(
        fs.readFileSync('./test.txt', 'utf8')
      );
      parseNickName.push({ nickName: nickName });

      fs.writeFileSync('./test.txt', `${JSON.stringify(parseNickName)}`);
      console.log('🎉 회원가입이 완료되었습니다. 🎉');
    } else {
      console.log('숫자만으로 아이디를 만들 수 없습니다.');
    }
  } catch {
    fs.writeFileSync('./test.txt', `[{"nickName" : "${nickName}"}]`);
    console.log('🎉 회원가입이 완료되었습니다. 🎉');
  }
}

function gameStart(filterUser: any): void {
  let randomQuiz = randomNum();
  let tryCount = 0;

  while (true) {
    console.log('1 ~ 9까지 원하는 숫자 세가지를 입력하세요.');
    const numInput: string = readline.question();

    const changeNum: Array<number> = numInput
      .split(' ')
      .map((el) => Number(el));

    const filterIfLength: number = filterIf(changeNum).length;

    if (filterIfLength === 3) {
      tryCount++;
      let ballCount: number = 0;
      let strikeCount: number = 0;
      for (let i = 0; i < changeNum.length; i++) {
        const howManyBall: Boolean = randomQuiz.includes(changeNum[i]);
        if (howManyBall && randomQuiz[i] === changeNum[i]) {
          strikeCount++;
        } else if (howManyBall) {
          ballCount++;
        }
      }

      if (ballCount === 0 && strikeCount === 0) {
        console.log('Out!');
        console.log();
      } else if (strikeCount === 3) {
        console.log();
        console.log('🎊 Home Run! 🎊');
        console.log(`축하합니다! ${tryCount}번 만에 성공하셨습니다!`);
        console.log();
        break;
      } else if (ballCount !== 0 && strikeCount === 0) {
        console.log(`⚾ ${ballCount} Ball! ⚾`);
        console.log();
      } else if (strikeCount !== 0 && ballCount === 0) {
        console.log(`⚾ ${strikeCount} Strik! ⚾`);
        console.log();
      } else {
        console.log(`⚾ ${strikeCount} Strik, ${ballCount} Ball! ⚾`);
        console.log();
      }
    }
  }

  if (filterUser.bestScore === undefined || filterUser.bestScore > tryCount) {
    filterUser.bestScore = tryCount;

    let parseData = JSON.parse(fs.readFileSync('./test.txt', 'utf8'));

    const filter = parseData.filter((el: any) => {
      if (el.nickName === filterUser.nickName) {
        return el;
      }
    });

    parseData.splice(parseData.indexOf(filter[0]), 1);
    parseData.push(filterUser);

    fs.writeFileSync('./test.txt', `${JSON.stringify(parseData)}`);
  }
}

function filterIf(numArr: Array<number>) {
  let newArr: Array<number> = [];

  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] < 10 && numArr[i] >= 1) {
      const isDupli: number = new Set(numArr).size;

      if (numArr.length !== isDupli || numArr.length !== 3) {
        console.log(
          '🧐 숫자 중 중복이 있거나 숫자 세 가지를 선택하지 않으셨습니다. 🧐'
        );
        console.log();
        break;
      }
      newArr.push(numArr[i]);
    } else {
      console.log(`🧐 1 ~ 9 숫자에서만 골라주세요. 🧐`);
      console.log();
      break;
    }
  }

  return newArr;
}

function searchBestRecord(filterUser: any): any {
  const findUser = JSON.parse(fs.readFileSync('./test.txt', 'utf8')).filter(
    (el: any) => {
      if (el.nickName === filterUser.nickName) {
        return el;
      }
    }
  );

  if (findUser[0].bestScore === undefined) {
    return '아직 기록이 없군요! 게임을 먼저 시작해 주세요!';
  } else {
    return `${findUser[0].nickName}님의 최고기록은 ${findUser[0].bestScore}번 입니다!`;
  }
}

function randomNum() {
  let randomArr: Array<number> = [];

  while (randomArr.length !== 3) {
    let oneNine = Math.ceil(Math.random() * 9);
    if (randomArr.includes(oneNine)) {
      continue;
    } else {
      randomArr.push(oneNine);
    }
  }
  return randomArr;
}

main();
