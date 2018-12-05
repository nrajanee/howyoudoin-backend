create table Register(
	UserId integer,
	Username varchar(32),
	Password varchar(32),
	EmailAd varchar(32),
	primary key(UserId)
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
