# Hyperledger-dataTransfer : 하이퍼레저 기반 데이터 거래 시스템

##### by 박조박트리오
Sangwon Park: https://github.com/hobbychive, Junsik Cho: https://github.com/dzv123, Donghwan Park: https://github.com/srpark13

### Reference
https://hyperledger-fabric.readthedocs.io/en/release-2.2/

### 개발환경 구성
Docker, git. curl, golang, node, npm을 설치한 후, 다음의 명령어로 하이퍼레저 2.2.10을 설치한다.
* fabric 개발환경 구성 참고: https://hobbychive.github.io/posts/ubuntu-fabric-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0/
```
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.10
```
### DataTransfer 설치
fabric-samples폴더에서 hyperledger-dataTransfer를 설치한다.
```
cd fabric-samples/
git clone https://github.com/hobbychive/hyperledger-dataTransfer.git
```
### Network 구축
hyperledger-dataTransfer폴더에서 startFabric.sh를 실행한다.
```
cd hyperledger-dataTransfer/
./startFabric.sh
```
hyperledger fabric 2.2에서 제공하는 test-network 환경을 이용한다. 
startFabric.sh의 내용은 다음과 같으며, ca를 사용하여 network를 구축하고. chaincode를 network에 배포한다.
```
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn data -ccp ../hyperledger-dataTransfer/chaincode/ -ccl javascript
```
chaincode는 hyperledger-dataTransfer/chaincode/lib폴더의 dataTransfer.js이다.
chaincode의 함수는 InitLedger, CreateData, ReadData, UpdateData, DeleteData, DataExists, TransferData, GetAllDatas, GetSeller, GetBuyer가 있으며,
데이터는 다음과 같이 구성되어있다.
```
ID: "data1",
buyer: "Donghwan",
seller: "Sangwon",
registeredTime: "2023-04-01T12:00:00.235Z",
transactionTime: "2023-05-02T18:01:32.642Z",
description: "Information of Yonsei freshman",
dataCategory: "name, phone, email",
recordnum: "3000",
columnnum: "3",
similarity: "90",
retention: "30",
value: "80",
price: "100000 won",
capacity: "100mb",
possessionTransfer: "true",
prevTransfer: "null",
```

### DApp 구성요소 설치
application 폴더에서 DApp의 구성요소를 설치한다.
```
cd application
npm install
```
### DApp 환경 구성
application 폴더에서 start.js를 통해 admin과 user를 참여시키고, chaincode의 InitLedger가 실행되어 DApp의 준비가 끝난다.
```
node start.js
```
enrollAdmin, registerAndEnrollUser에는 hyperledger fabric 2.2에서 제공하는 test-application 폴더에서의 AppUtil.js, CAUtil.js를 이용한다.
application 폴더에 wallet 폴더가 생성되며 admin과 appUser가 참여함을 확인할 수 있다. 

 
### Server 실행
DApp을 실행한다. http://localhost:8080 의 주소로 접속할 수 있다.
```
cd server
node server.js
```
chaincode에 적은 함수들을 ui에 연동하여 앱에서 거래내역을 확인, 추가, 업데이트할 수 있다.
"ctrl+c"로 서버를 종료할 수 있다. 서버가 종료되도 네트워크와 거래 내역은 남아있으며, "node server.js"를 다시 실행하면 이를 확인할 수 있다.

서버는 server.js, controller.js, sdk.js로 구성되어있으며, 앱은 main.html, style.css, templete.js로 구성되어 있다.
서버에서 main.html을 유저에게 보내고, 유저는 main.html에서 서버에 요청을 보낸다.
서버가 요청을 받으면 controller.js를 통해 해당하는 요청의 종류를 해석하고, sdk.js를 통해 fabric network에 요청을 보낸다.
fabric network에서 요청을 받으면, 해당 내용을 templete.js에 담아 유저에게 보낸다.

* fabric 페이지 구성 참고: https://ghqls0210.tistory.com/260

### Network 종료
hyperledger-dataTransfer폴더에서 networkDown.sh를 실행한다.
```
cd ../..
./networkDown.sh
```
wallet 내용을 삭제하고 네트워크를 종료한다.

#### JMeter
성능을 테스트 할 수 있다.
* JMeter 참고: https://miiingo.tistory.com/176
