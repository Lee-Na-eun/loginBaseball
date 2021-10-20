import * as fs from 'fs';
import * as readline from 'readline-sync';

// classZone
interface userProperty {
  [key: string]: any;
}

class FindUserData {
  nickName?: object;
  bestScore?: number;

  constructor(questionInput?: string) {
    try {
      this.nickName = JSON.parse(fs.readFileSync('./test.txt', 'utf8')).filter(
        (el: userProperty) => el.nickName === questionInput
      )[0].nickName;

      this.bestScore = JSON.parse(fs.readFileSync('./test.txt', 'utf8')).filter(
        (el: userProperty) => el.nickName === questionInput
      )[0].bestScore;
    } catch {
      console.log();
    }
  }
}

class SignupUserData {
  bestScore?: number;
  nickName?: string;

  constructor(nickName?: string) {
    let usersArr = [];
    try {
      let readUserData: Array<object> = JSON.parse(
        fs.readFileSync('./test.txt', 'utf8')
      );

      readUserData.push({
        nickName: (this.nickName = nickName),
        bestScore: (this.bestScore = 50000),
      });
      fs.writeFileSync('./test.txt', JSON.stringify(readUserData));
    } catch {
      usersArr.push({
        nickName: (this.nickName = nickName),
        bestScore: (this.bestScore = 50000),
      });
      fs.writeFileSync('./test.txt', JSON.stringify(usersArr));
    }
  }
}
// classZone

function main(): void {
  while (true) {
    printFirstMenu();
    selectSignupLogin();
  }
}

function printFirstMenu(): void {
  console.log();
  console.log('⚾ 숫자야구를 시작합니다! ⚾\n');
  console.log('1. 로그인');
  console.log(`2. 회원가입 \n`);
}

function selectSignupLogin(): void {
  while (true) {
    const selectInput: string = readline.question();
    if (selectInput === '1') {
      console.log();
      console.log(`📌 아이디를 입력해주세요. 📌 \n`);
      login();
      break;
    } else if (selectInput === '2') {
      console.log();
      console.log(`📝 회원가입 하실 아이디를 입력해주세요. 📝 \n`);
      signup();
      break;
    } else {
      console.log();
      console.log(`1번과 2번 중에서 골라주세요. \n`);
      break;
    }
  }
}

function login(): void {
  while (true) {
    const inputYourNickname: string = readline.question();

    if (new FindUserData(inputYourNickname).nickName === undefined) {
      console.log(`🤔 회원정보가 없습니다. 회원가입 먼저 해주세요. 🤔 \n`);
      break;
    } else if (new FindUserData(inputYourNickname)) {
      console.log();
      console.log(
        `😍 환영합니다, ${new FindUserData(inputYourNickname).nickName}님 😍 \n`
      );

      selectAfterLoginQuetion(inputYourNickname);
      break;
    }
  }
}

function signup(): void {
  const signupForNickname: string = readline.question();

  if (new FindUserData(signupForNickname).nickName) {
    console.log('이미 존재하는 회원정보 입니다.');
  } else {
    new SignupUserData(signupForNickname);
    console.log('🎉 회원가입이 완료되었습니다. 🎉');
  }
}

function selectAfterLoginQuetion(inputYourNickname: string): void {
  while (true) {
    console.log();
    console.log(`메뉴를 선택해주세요. \n`);
    console.log(`1. 게임시작`);
    console.log(`2. 내 최고기록 보기`);
    console.log(`3. 종료 \n`);

    const anwerQuestion: string = readline.question();

    if (anwerQuestion === '1') {
      console.log(`게임을 시작합니다. \n`);
      gameStart(inputYourNickname);
    } else if (anwerQuestion === '2') {
      console.log(
        `${
          new FindUserData(inputYourNickname).nickName
        }님의 최고 기록 입니다. \n`
      );
    } else if (anwerQuestion === '3') {
      console.log(`종료합니다 \n`);
      break;
    }
  }
}

function gameStart(inputYourNickname: string): void {
  let randomQuiz: number[] = randomNum();
  console.log(randomQuiz);
  let tryCount: number = 0;

  ballStrikeCompare(randomQuiz, tryCount, inputYourNickname);
}

function ballStrikeCompare(
  randomQuiz: Array<number>,
  tryCount: number,
  inputYourNickname: string
) {
  while (true) {
    console.log('1 ~ 9까지 원하는 숫자 세가지를 입력하세요.');
    const numInput: string = readline.question();

    let ballCount: number = 0;
    let strikeCount: number = 0;

    const changeNum: Array<number> = numInput
      .split(' ')
      .map((el) => Number(el));

    const filterIfLength: number = filterIf(changeNum).length;

    if (filterIfLength === 3) {
      tryCount++;
    } else {
      break;
    }

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
      console.log(tryCount);
      bestScoreCompareAndRenewal(tryCount, inputYourNickname);
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

function bestScoreCompareAndRenewal(
  tryCount?: number,
  inputYourNickname?: string
): void {
  let yourData = new FindUserData(inputYourNickname);
  const readDataFile: Array<object> = JSON.parse(
    fs.readFileSync('test.txt', 'utf8')
  );
  const findSameDataIdx: number = JSON.parse(
    fs.readFileSync('test.txt', 'utf8')
  )
    .map((el: userProperty) => el.nickName)
    .indexOf(inputYourNickname);

  if (yourData.bestScore === 50000) {
    console.log('renewal Score!');
    yourData.bestScore = tryCount;
    readDataFile.splice(findSameDataIdx, 1);
    readDataFile.push(yourData);
    fs.writeFileSync('test.txt', JSON.stringify(readDataFile));
  }
}

function filterIf(numArr: Array<number>) {
  let newArr: Array<number> = [];

  while (true) {
    for (let i = 0; i < numArr.length; i++) {
      if (numArr[i] < 10 && numArr[i] >= 1) {
        const isDupli: number = new Set(numArr).size;

        if (numArr.length !== isDupli || numArr.length !== 3) {
          console.log(
            '🧐 숫자 중 중복이 있거나 숫자 세 가지를 선택하지 않으셨습니다. 🧐'
          );
          console.log();
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
