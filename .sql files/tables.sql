create table Register(
	Username varchar(32),
	Password varchar(32),
	EmailId varchar(32),
	primary key(Username)
);

create table MoodTracker(
	Emotion varchar(32),
	counter integer,
	primary key(Emotion)
);

create table Links(
	Emotion varchar(32),
	urls varchar(32)
);
