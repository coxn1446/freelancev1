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


ALTER TABLE public.blogs OWNER TO apple;

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


ALTER TABLE public.blogs_id_seq OWNER TO apple;

--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


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


ALTER TABLE public.comments OWNER TO apple;

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


ALTER TABLE public.comments_id_seq OWNER TO apple;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    comment_id character varying NOT NULL,
    user_id character varying NOT NULL
);


ALTER TABLE public.likes OWNER TO apple;

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


ALTER TABLE public.likes_id_seq OWNER TO apple;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: apple
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO apple;

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


ALTER TABLE public.users OWNER TO apple;

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


ALTER TABLE public.users_id_seq OWNER TO apple;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apple
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


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
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.blogs (id, title, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, paragraph6, paragraph7, paragraph8, paragraph9, paragraph10) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.comments (id, user_id, date, post, text, hour, num_of_likes) FROM stdin;
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
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: apple
--

COPY public.users (id, password, username, firstname, lastname, phonenumber, profilepic, email) FROM stdin;
\.


--
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.blogs_id_seq', 1, false);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.likes_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apple
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


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

