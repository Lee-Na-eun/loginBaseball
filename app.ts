import * as fs from 'fs';
import * as readline from 'readline-sync';

function main(): void {
  while (true) {
    console.log('⚾ 숫자야구를 시작합니다! ⚾');
    console.log(loginOrSignup());
    console.log();
  }
}

function loginOrSignup(): string {
  console.log('1. 로그인');
  console.log('2. 회원가입');
  const loginInput: string = readline.question();
  if (loginInput === '1') {
    return login();
  } else if (loginInput === '2') {
    return signup();
  } else {
    return '1번과 2번 중에서 골라주세요.';
  }
}

function signup(): string {
  console.log();
  console.log('📝 회원가입 하실 아이디를 입력해주세요. 📝');
  const nickName: string = readline.question();

  try {
    let parseNickName = JSON.parse(fs.readFileSync('./test.txt', 'utf8'));

    parseNickName.push({ nickName: nickName });
    fs.writeFileSync('./test.txt', `${JSON.stringify(parseNickName)}`);
  } catch {
    fs.writeFileSync('./test.txt', `[{"nickName" : "${nickName}"}]`);
  }

  if (Number(nickName)) {
    return '숫자만으로 아이디를 만들 수 없습니다.';
  } else {
    return '🎉 회원가입이 완료되었습니다. 🎉';
  }
}

function login(): string {
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
    return '🤔 회원정보가 없습니다. 회원가입 먼저 해주세요. 🤔';
  } else {
    console.log();
    console.log(`😍 환영합니다, ${filterUser[0].nickName}님 😍`);
    console.log();
    return selectGame();
  }
}

function selectGame(): string {
  console.log('메뉴를 선택해주세요.');
  console.log('1. 게임시작');
  console.log('2. 내 최고기록 보기');
  console.log('3. 종료');
  const selectMenu = readline.question();

  return 'hi';
}

function gameStart() {}

function searchBestRecord() {}

function theEnd() {}

main();
