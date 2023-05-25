# hyperledger-dataTransfer

* fabric 개발환경 구성 - https://hobbychive.github.io/posts/ubuntu-fabric-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0/
* data-transfer코드 - https://github.com/hobbychive/hyperledger-dataTransfer
* fabrucUI참고 - https://ghqls0210.tistory.com/260
* JMeter - https://miiingo.tistory.com/176

1. 개발환경 구성을 하고, "curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.10" 명령어로 하이퍼레저 2.2.10을 설치한다.
2. "cd fabric-samples/"로 fabric-samples폴더로 이동한 후 "git clone https://github.com/hobbychive/hyperledger-dataTransfer.git" 명령어로 이 앱을 설치한다.
3. "cd hyperledger-dataTransfer/"로 hyperledger-dataTransfer폴더로 이동한 후 "./startFabric.sh" 명령어로 network를 올린다.
  3-1. startFabric.sh 파일에서는 hyperledger fabric 2.2에서 제공하는 test-network 환경을 이용한다. 
  3-2. test-network에서 network.sh 파일을 통해 network를 올리고, hyperledger-dataTransfer의 chaincode를 network에 배포한다.
4. "cd application"로 application폴더로 이동한 후 "npm install" 명령어로 node_modules을 받는다.
5. "node start.js" 명령어로 admin과 user를 참여시키고, InitLedger가 실행되어 blockchain이 준비된다.
  5-1. wallet 폴더가 생성되며 admin과 appUser가 참여함을 확인할 수 있다. 
6. "cd server"로 server폴더로 이동한 후 "node server.js" 명령어로 dApp을 실행한다.
  6-1. http://localhost:8080 에 서버가 실행되고, chaincode에 적은 함수들을 ui에 연동하여 앱에서 거래내역을 확인, 추가, 업데이트할 수 있다.
  6-2. "ctrl+c"로 서버를 종료할 수 있다. 서버가 종료되도 네트워크와 거래 내역은 남아있으며, "node server.js"를 다시 실행하면 이를 확인할 수 있다.
7. hyperledger-dataTransfer폴더에서 "./networkDown.sh" 명령어로 wallet 내용을 삭제하고 네트워크를 종료한다.

JMeter를 통해 성능을 테스트 할 수 있다.
