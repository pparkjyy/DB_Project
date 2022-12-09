use db_project;

# 주식 정보 table
CREATE TABLE STOCK(
	code varchar(10) NOT NULL PRIMARY KEY,	# 종목 코드
	stock_name varchar(50) NOT NULL			# 종목 이름
);

# 주식 회사 table
CREATE TABLE COMPANY(
	code varchar(10) NOT NULL PRIMARY KEY,		# 종목 코드
    company_name varchar(50) NOT NULL,			# 종목 이름
    stock_count bigint NOT NULL,				# 상장 주식 수
    company_info varchar(500) NOT NULL,			# 기업 개요
    FOREIGN KEY (code) REFERENCES STOCK(code)
);

# 주주 현황 table
CREATE TABLE STOCK_O(
	code varchar(10) NOT NULL,					# 종목 코드
    stock_owner varchar(50) NOT NULL,			# 주요 주주
    stock_num int NOT NULL,						# 보유 주식 수
    stock_p float NOT NULL,						# 보유 지분
    FOREIGN KEY (code) REFERENCES STOCK(code)
);

# 종목 시세 정보 table
CREATE TABLE STOCK_P(
	date varchar(50) NOT NULL,						# 날짜
    n_price int NOT NULL,					# 시가
    h_price int NOT NULL,					# 고가
    l_price int NOT NULL,					# 저가    
    e_price int NOT NULL,					# 종가
    price_count int NOT NULL,				# 거래량
    Changerate double default 0,				# 변동량
    code varchar(10) NOT NULL,	# 종목 코드
	PRIMARY KEY (code, date),
    FOREIGN KEY (code) REFERENCES STOCK(code)
);

# 사용자 table
CREATE TABLE USER(
	id varchar(16) NOT NULL PRIMARY KEY,	# id
    pw varchar(21) NOT NULL,				# 비밀번호
    name varchar(20) NOT NULL,				# 이름
    age char(50) NOT NULL,					# 나이
    phone varchar(12) NOT NULL UNIQUE,		# 전화번호
    email varchar(20) NOT NULL,				# 이메일
    ban bool default false,					# 정지 여부
    money int default 0						# 계좌 잔액
);
/*
DELIMITER $$
CREATE TRIGGER trig_user_check BEFORE INSERT ON USER
FOR EACH ROW
BEGIN
IF (NEW.ID REGEXP '[A-za-z0-9]{5,15}') = 0 THEN
	SIGNAL SQLSTATE '10001'
		SET MESSAGE_TEXT = "id는 영문이나 숫자고 길이는 5~15자 입니다.";
ELSEIF (NEW.PW REGEXP '(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,20}') = 0 THEN
	SIGNAL SQLSTATE '10002'
		SET MESSAGE_TEXT = "비밀번호는 8~20자, 최소 하나의 문자 및 하나의 솟자를 포함해야 합니다.";
ELSEIF (NEW.age REGEXP '[0-9]{6}-[0-9]{7}') = 0 THEN
	SIGNAL SQLSTATE '10003'
		SET MESSAGE_TEXT = "주민번호는 총 13자리 입니다.";
ELSEIF (NEW.phone REGEXP '[0-9]{0,12}' ) = 0 THEN
	SIGNAL SQLSTATE '10004'
		SET MESSAGE_TEXT = "전화번호는 9~11자 입니다.";
END IF;
END$$
*/

# 계좌번호 table
CREATE TABLE USER_A(
	ID varchar(16) NOT NULL,	# 사용자 ID
    A_num varchar(50) NOT NULL,	# 계좌번호
    PRIMARY KEY (ID, A_num),
    FOREIGN KEY (ID) REFERENCES USER(ID)
);

# 구매 주식 table
CREATE TABLE STOCK_U(
	ID varchar(16) NOT NULL,	# 사용자 ID
    code varchar(10) NOT NULL,	# 종목 코드
    stock_num int NOT NULL,		# 주식 수
    stock_price int NOT NULL,	# 구매 가격
    PRIMARY KEY (ID, code, stock_price),
    FOREIGN KEY (ID) REFERENCES USER(ID),
    FOREIGN KEY (code) REFERENCES STOCK(code)
);

# 관심 주식 table
CREATE TABLE STOCK_UZ(
	ID varchar(16) NOT NULL,	# 사용자 ID
    code varchar(10) NOT NULL,	# 종목 코드
    PRIMARY KEY(ID, code),
    FOREIGN KEY (ID) REFERENCES USER(ID),
    FOREIGN KEY (code) REFERENCES STOCK(code)
);

# 최근 조회 table
CREATE TABLE STOCK_UC(
	ID varchar(16) NOT NULL,	# 사용자 ID
	code varchar(10) NOT NULL,	# 종목 코드
    time datetime NOT NULL,			# 조회 시간
    PRIMARY KEY(ID, time),
    FOREIGN KEY (ID) REFERENCES USER(ID),
    FOREIGN KEY (code) REFERENCES STOCK(code)
);

# 관리자 table
CREATE TABLE ADMIN(
	ID varchar(16) NOT NULL PRIMARY KEY,	# 관리자 ID
    PW varchar(21) NOT NULL					# 관리자 비밀번호
);

# 공지사항 table
CREATE TABLE A_BOARD(
	postnum int not null primary key auto_increment,
    title varchar(100) NOT NULL,			# 제목
    text varchar(500) NOT NULL,				# 내용
    date datetime NOT NULL,						# 작성날짜
    num INT default 0						# 조회수
);

# 종목 토론 게시판 table
CREATE TABLE U_BOARD(
	ID varchar(16) NOT NULL,						# 작성자 ID
    t_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,	# 글 ID
    code varchar(10) NOT NULL,						# 종목 코드
    title varchar(100) NOT NULL,					# 글 제목
    text varchar(500) NOT NULL,						# 글 내용
    time datetime NOT NULL,								# 작성시간
    num int default 0,								# 조회수
    FOREIGN KEY (ID) REFERENCES USER(ID),
    FOREIGN KEY (code) REFERENCES STOCK(code)
);

# 종목 토론 게시판 댓글 table
CREATE TABLE D_BOARD(
	ID varchar(16) NOT NULL PRIMARY KEY,		# 댓글 작성자 ID
    t_id int NOT NULL,							# 글 ID
    text varchar(500) NOT NULL,					# 댓글 내용
    time datetime NOT NULL,							# 댓글 작성 시간
    FOREIGN KEY (ID) REFERENCES USER(ID),
    FOREIGN KEY (t_id) REFERENCES U_BOARD(t_id)
);
    


    
    