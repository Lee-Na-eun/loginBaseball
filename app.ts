import * as fs from 'fs';
import * as readline from 'readline-sync';

function main(): void {
  while (true) {
    console.log('숫자야구를 시작합니다!');
    console.log(loginOrSignup());
    console.log();
  }
}

function loginOrSignup(): string {
  console.log('1. 로그인');
  console.log('2. 회원가입');
  const loginInput: string = readline.question();
  if (loginInput === '1') {
    return '로그인!';
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
    return '회원가입이 완료되었습니다.';
  }
}

main();
