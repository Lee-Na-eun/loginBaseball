import * as fs from 'fs';
import * as readline from 'readline-sync';

function main(): void {
  while (true) {
    console.log('⚾ 숫자야구를 시작합니다! ⚾');
    console.log('1. 로그인');
    console.log('2. 회원가입');
    const loginInput: string = readline.question();
    if (loginInput === '1') {
      console.log();
      console.log('아이디를 입력해주세요.');
      const loginInput: string = readline.question();
      const userParse: any = JSON.parse(fs.readFileSync('./test.txt', 'utf8'));

      try {
        userParse;
      } catch {
        console.log('회원가입 먼저 해주세요.');
      }

      const filterUser: any = userParse.filter(
        (el: any) => el.nickName === loginInput
      );

      if (filterUser.length === 0) {
        console.log('🤔 회원정보가 없습니다. 회원가입 먼저 해주세요. 🤔');
      } else {
        console.log();
        console.log(`😍 환영합니다, ${filterUser[0].nickName}님 😍`);
        console.log();
        console.log('메뉴를 선택해주세요.');
        console.log('1. 게임시작');
        console.log('2. 내 최고기록 보기');
        console.log('3. 종료');
        const selectMenu = readline.question();

        if (selectMenu === '1') {
          console.log(gameStart());
        } else if (selectMenu === '2') {
          console.log(searchBestRecord());
        } else {
          console.log(theEnd());
          break;
        }
      }
    } else if (loginInput === '2') {
      console.log(signup());
      console.log();
    } else {
      console.log('1번과 2번 중에서 골라주세요.');
      console.log();
    }
  }
}

function signup(): string {
  console.log();
  console.log('📝 회원가입 하실 아이디를 입력해주세요. 📝');
  const nickName: string = readline.question();

  try {
    fs.readFileSync('./test.txt', 'utf8');
  } catch {
    fs.writeFileSync('./test.txt', `[{"nickName" : "${nickName}"}]`);
  }

  if (isNaN(Number(nickName))) {
    let parseNickName: Array<object> = JSON.parse(
      fs.readFileSync('./test.txt', 'utf8')
    );
    parseNickName.push({ nickName: nickName });

    fs.writeFileSync('./test.txt', `${JSON.stringify(parseNickName)}`);
    return '🎉 회원가입이 완료되었습니다. 🎉';
  } else {
    return '숫자만으로 아이디를 만들 수 없습니다.';
  }
}

function selectGame(): string {
  console.log('메뉴를 선택해주세요.');
  console.log('1. 게임시작');
  console.log('2. 내 최고기록 보기');
  console.log('3. 종료');
  const selectMenu = readline.question();

  if (selectMenu === '1') {
    return gameStart();
  } else if (selectMenu === '2') {
    return searchBestRecord();
  } else {
    return theEnd();
  }
}

function gameStart(): string {
  return 'gameStart';
}

function searchBestRecord(): string {
  return 'searchBestRecord';
}

function theEnd(): string {
  return '게임을 종료합니다.';
}

main();
