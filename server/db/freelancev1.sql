--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ads; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.ads (
    id integer NOT NULL,
    subject character varying NOT NULL,
    date character varying NOT NULL,
    desktop_banner boolean NOT NULL,
    mobile_banner boolean NOT NULL,
    url character varying NOT NULL,
    contact character varying NOT NULL,
    pay_method character varying NOT NULL,
    user_id integer NOT NULL
);

--
-- Name: ads_id_seq; Type: SEQUENCE; Schema: public; Owner: apple
--

CREATE SEQUENCE public.ads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: ads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--


--
-- Name: blogs; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    title character varying NOT NULL,
    paragraph1 character varying,
    paragraph2 character varying,
    paragraph3 character varying,
    paragraph4 character varying,
    paragraph5 character varying,
    paragraph6 character varying,
    paragraph7 character varying,
    paragraph8 character varying,
    paragraph9 character varying,
    paragraph10 character varying
);

--
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: apple
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--


--
-- Name: comments; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id character varying NOT NULL,
    date character varying NOT NULL,
    post character varying NOT NULL,
    text character varying NOT NULL,
    hour character varying NOT NULL,
    num_of_likes integer DEFAULT 0 NOT NULL
);

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: apple
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--


--
-- Name: likes; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    comment_id character varying NOT NULL,
    user_id character varying NOT NULL
);

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: apple
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--


--
-- Name: session; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password character varying NOT NULL,
    username character varying NOT NULL,
    firstname character varying,
    lastname character varying,
    phonenumber character varying,
    profilepic character varying NOT NULL,
    email character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: apple
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--


--
-- Name: ads id; Type: DEFAULT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.ads ALTER COLUMN id SET DEFAULT nextval('public.ads_id_seq'::regclass);


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.ads (id, subject, date, desktop_banner, mobile_banner, url, contact, pay_method, user_id) FROM stdin;
\.


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.blogs (id, title, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, paragraph6, paragraph7, paragraph8, paragraph9, paragraph10) FROM stdin;
1	Jobs	At 21 years old, the most I had ever been paid for an hour’s worth of work was $12. It was a job at my local gas station, a humiliating place to work since seemingly everyone I knew from home bought their gas there. But I was devastatingly broke and there was not much I wouldn’t do for 12 bucks an hour. There were some benefits to my time at the gas station. For instance, I discovered which of my high school teachers were alcoholics. I earned 50% off select brands of wiper fluid, or at least I was made aware of that public, albeit minimally advertised discount. I also earned about $1,500 before heading back up to school. Say what you will about pride, but it doesn’t amount to much when your bank account reads $1.57. And say what you will about ‘Lil Mart, but it wasn’t even the worst job I had ever had.	The second worst job I ever had was as a telemarketer for a meat sales company. It was my first “office job;” I had my own rolodex and everything. I used that rolodex to call everyone from Kittery to Caribou. Not everyone was as thrilled to hear from me as I was to tell them about our angus beef burgers. I accidentally called Susan twice in one week and she called me a “godless, lying, piece of human garbage.” When you encounter a Susan, you are trained to immediately hang up and dial the next number, which I did approximately 400 times a night. Of the 400 people I’d call nightly, 50% wouldn’t pick up. Of the remaining 200, 50% were Susans, pissed off I’m calling them on the one night a week they get to see their kids. About 98-99 of the remaining 100 would politely tell me “no,” and hang up. If I got one “yes,” it was a good night. Two and I’m ecstatic. The one downside to the constant rejection was that my boss was a convicted child molester. In fact, everyone at the call center was a criminal. I found out a few weeks into the job that the company had a partnership with the local prison and everyone who worked there was attempting to rehabilitate into society. Don’t get me wrong, I am a huge proponent of second chances, but it became hard to focus on working when there was a fist fight in the office every other day. I thought that was bad, but a year later, it got worse.	I was a cell phone salesman, going door-to-door in the ghetto wearing a suit and tie during a sweltering Miami summer. These cell phones came from a government program, you could qualify for one using your food stamp card. I was pretty good at it, so within a month I was promoted and given the responsibility of training my own team of salesmen. At 20 years old, it was more responsibility than I had ever had in my life. My team grew, I even got a little percentage of their sales! If those salesmen I trained were promoted, I would get a percentage of the sales from the salesmen under them. It would just continue like that until I got fabulously wealthy or realized the whole thing was a massive, illegal pyramid scheme. Looking back, the red flags were everywhere. This company had all the trappings of an exuberant, entrepreneurial sales firm. They were on the 10th floor of the JP Morgan Chase building, had a receptionist, and a lobby full of potential applicants on the first day of interviews. On the second day, the lobby was empty, making you think they were weeding people out when in reality it was a scheduling trick; everyone passed the first interview. I was hired, like everyone else, but I wasn’t paid for the first month. I guess their payment system was broken or something. If I quit during that period, I would get nothing, so I just stuck it out. My first paycheck was for about half of what I expected it to be. I never really did get paid which is why, when I got an email informing me of a class action lawsuit against this company, I signed up immediately. The wage fraud they committed against me was committed against hundreds of others. If that lawsuit ever pays out, then the hundreds of hours I spent slanging track phones to drug dealers and prostitutes might be worth it, financially speaking that is.	Even though those experiences might have been tough in the moment, like having to explain to a Susan I wasn’t sent by Satan himself to sell her beef patties or having to explain to some guy in a Miami ghetto that I wasn’t interested in trading a cell phone for his drugs, they’re meaningful to me now. They taught me the value of a dollar and more importantly, the value of my time. As I work to increase the value of my time, I think about how any success I may obtain in the future would not be possible had I not first learned the humility of pumping gas, the hustle of 399 no's a night, and the resilience to stick it out when things get tough... of course that is, until it’s time to sue.	\N	\N	\N	\N	\N	\N
3	Wind	I have consistently found myself in chaotic situations. Like having a few afternoon beers at a honky-tonk in Nashville with a 12-seat van full of foreigners. Or the time I saw a Green Day cover band play at a farm in the middle of an Icelandic ash field. Sailing around the British Virgin Islands for a week, bartering with locals was cool. All these uniquely weird experiences were just one side of a coin. On this end, you had the universe unfurling in beautiful, unexpected ways. On the other, you had shit hitting the absolute fucking fan. Unfortunately, you cannot have the former without the latter.	My roommate in Miami, whom I met online, did the wrong dose of LSD and thought he was Chronos from Ancient Greece. The cops eventually had to zip tie his arms down to stop him from bleeding out in our driveway. I almost froze to death on a riverbank in Maine because we canoed downstream, got lost and had no service to call a ride home. I could have frozen to death had I not been able to hitchhike my way back to civilization. Let’s not forget the time my group was held up at knifepoint in Montreal by the Canadian mob. It was a misunderstanding, our buddy talked to the wrong girl at one of their clubs, but still: absurd.	Absurd things happen when you go with the flow. This means never knowing where you will end up when you go out. It means never booking your schedule more than a week in advance. After a while of this, you start to recognize when the universe is guiding you towards an interesting experience. But of course, it’s impossible for you to know from what side of the coin this experience will derive. Will it be beautiful or awful? Will it be meaningfully constructive or meaningfully destructive?	I’m at ease with this uncertainty, of never knowing on which side the coin will land. More often than not, this uncertainty leads me to moments I am positive were made for me. Moments when I have the wind in my hair and a cabin of kids in my boat learning to love the hum of an even keel. Moments when I have snuck out of the house at 16 years old to watch the sun rise over a world that, in that moment, was entirely our own.	These moments are the eye of the storm, when the chaos stops and there is beautiful, peaceful understanding. When there is freedom to do what you please but also an awareness that even if you could do anything else, you wouldn’t. Knowing that in this realm of infinite tragedies; of seemingly endless, meaningless suffering; you have found yourself in a moment in which you are perfectly content. I think these moments are what life is all about, and I think that these moments will pass you by if you do not have the nerve to flip that coin.	\N	\N	\N	\N	\N
4	Collecting	I once got in trouble in my kindergarten’s afterschool program because I snuck into a side room to play Pokémon with my friend Ian. I always liked that game because it involved collecting little creatures and improving them over time. By the end of the game, your collection became the best in the world, at least it was the best in your version of the 2-bit Pokémon world. My habit of collecting low-res, video-game creatures “evolved” into collecting pins. My mom bought me a Buckingham Palace guard pin during my family vacation in London. I earned a Syracuse Orangemen pin at a youth lacrosse tournament where I may or may not have scored a goal. I don’t remember the goal, but I remember the pin. Every time I received a new pin, I would stick it in the drywall above my bed. Soon I had a few dozen pins but it wasn’t enough. I collected stuffed animals, shoes, CDs. I started collecting coins, first the 50 state quarters, then foreign currencies I stumbled across in my travels. My collectables were memories, monuments to my achievements which, just by existing in some exalted place of honor in my room, challenged me to collect more.	These childhood routines coalesced into beneficial adult habits. I started writing a daily journal, capturing, in repetitive prose, both the mundane and the tentpole milestones of my life. Every day is a new addition to my ever-growing collection, one that I occasionally look back on to observe my progress or concerning lack thereof.	I am learning how to build full-stack web apps, evidenced by my collection of completed projects. Each project link represents a new skill learned; the list of links depicts my educational journey as a whole. This collection of links reassures me as I struggle through the current project. I constantly wonder if the current project will be the one I can’t figure out, the one that’s going to cause this progress to come to a grinding halt. But I’ve thought that on the last nine projects so this collection of links acts as a reminder the voice in my head is wrong.	Even this vignette “Collecting” is a small piece of a larger set. This collection of short stories are the same tall tales I tell to everyone I meet. I realized one day I should write these stories down for posterity. As I wrote, I noticed threads between the stories which connected previously unrelated parts of my life. These threads became themes, these themes became principles, and the principles became a series of tattoos on my back: yet another collection. I’m happy with the results collecting has provided me so far, but of course nothing is set in stone. Maybe I will grow to hate the designs on my back, maybe coding will bring me nowhere, maybe my dad will hoist me up by the ears for poking 100 pin-sized holes in my wall. In that sense, collecting is risky business. But I have been comfortable with the risks that come with collecting ever since I got caught raising my Charmander in that dark room after kindergarten.	\N	\N	\N	\N	\N	\N
2	Anatomy	The most important lesson I ever learned was in an elective Anatomy class. I had recently been accepted into college and I had already earned all the credits I needed in order to graduate high school. In other words, I was on my senior slide, and I took that to an extreme most of my peers did not. I wasn’t interested in Anatomy in the slightest and every day I would show up, plop down at my desk, kick my feet up, open that week’s edition of the Falmouth Forecaster and read about the latest municipal ordinances passed by our town’s council. I wasn’t interested in additions to our public library either, but I was more interested in that than our central nervous system. Mrs. H would pass out homework, I would glance at it and then, after the bell rang, I would toss it in her trashcan on my way out the door. On exam day I would receive my test, fill out my name, and hand it back to Mrs. H immediately, all the answers completely blank. Looking back, I wish I wasn’t such a disrespectful little twerp, but then again, if I wasn’t, then I would have never learned my lesson.	One day, after realizing this was going to last all Spring, she asked me, “why do you even show up?”	“Because,” I said. “If I don’t, I will receive an Unexcused Absence and then I can’t play lacrosse.”	I had worked it all out. I only needed to be passing the majority of my classes to remain on the roster. Since I was in five classes, I could purposefully fail two and stay on the team. I chose Anatomy and pre-calc. I did the math and concluded that there was a 0% chance I was ever going to use the “unit circle” in my day-to-day life after high school. In fact, the way I saw it then, I didn’t really need to know anything about either subject if I was going to major in English at UMaine.	“Don’t you want to pass?” She asked. “Don’t you care about what this will do to your GPA? I thought about this question carefully before responding: “no. Sorry.”	You see, the lesson I learned in Anatomy had nothing to do with our reproductive organs or how much electricity flows through each neuron every day. The lesson was that I didn’t care, I was right not to have cared, and that the world was more malleable than the authority figures in my life wanted me to believe. I think after I graduated, they changed the rules so that you couldn’t do what I did, but the fact remained: I saw this social system, controlled by tight schedules, appearances and expectations, and thought to myself, can I change it? Everything in my world was a social contract that could be broken at any time for any reason or no reason at all. The cost of breaking these conventions might be my reputation, or some social currency, or the loss of a few likes on Instagram, but it’s worth it just to know that this world, seemingly rigid in its ideals and agreements, can be changed. And that this change can come from me.	\N	\N	\N	\N
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.comments (id, user_id, date, post, text, hour, num_of_likes) FROM stdin;
8	6	Fri Dec 30 2022	blogPostAnatomy	Use the form above to post comments. You also have the option to "like" comments by clicking on the thumbs up icon.	15:12:45 GMT-0500 (Eastern Standard Time)	0
9	6	Fri Dec 30 2022	blogPostWind	Use the form above to post comments. You also have the option to "like" comments by clicking on the thumbs up icon.	15:13:08 GMT-0500 (Eastern Standard Time)	0
10	6	Fri Dec 30 2022	blogPostJobs	Use the form above to post comments. You also have the option to "like" comments by clicking on the thumbs up icon.	15:13:13 GMT-0500 (Eastern Standard Time)	0
11	6	Fri Dec 30 2022	blogPostCollecting	Use the form above to post comments. You also have the option to "like" comments by clicking on the thumbs up icon.	15:13:18 GMT-0500 (Eastern Standard Time)	0
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.likes (id, comment_id, user_id) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.session (sid, sess, expire) FROM stdin;
Eqt_3DpAFIHlQzbyrPebA6qF2NgQpFKF	{"cookie":{"originalMaxAge":2592000000,"expires":"2023-01-29T23:25:49.890Z","secure":false,"httpOnly":false,"path":"/"}}	2023-01-29 18:25:50
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.users (id, password, username, firstname, lastname, phonenumber, profilepic, email) FROM stdin;
6	$2b$10$wp8RecekCcNmNG4vaG5oWeflFmmlV0DNYCWR5wIp/6PZ/jg/57nKG	WWN	William	Nash		https://picsum.photos/id/378/200	\N
\.


--
-- Name: ads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.ads_id_seq', 5, true);


--
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.blogs_id_seq', 1, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.comments_id_seq', 14, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.likes_id_seq', 194, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: apple
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: apple
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- PostgreSQL database dump complete
--

