--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    "userId" integer
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Categories_id_seq" OWNER TO postgres;

--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- Name: Posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Posts" (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    "categoryId" integer,
    "subcategoryId" integer,
    "userId" integer
);


ALTER TABLE public."Posts" OWNER TO postgres;

--
-- Name: Posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Posts_id_seq" OWNER TO postgres;

--
-- Name: Posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Posts_id_seq" OWNED BY public."Posts".id;


--
-- Name: Subcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Subcategories" (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    "categoryId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Subcategories" OWNER TO postgres;

--
-- Name: Subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Subcategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Subcategories_id_seq" OWNER TO postgres;

--
-- Name: Subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Subcategories_id_seq" OWNED BY public."Subcategories".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- Name: Posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts" ALTER COLUMN id SET DEFAULT nextval('public."Posts_id_seq"'::regclass);


--
-- Name: Subcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subcategories" ALTER COLUMN id SET DEFAULT nextval('public."Subcategories_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" (id, slug, "userId") FROM stdin;
1	categoryName1	1
3	categoryName2	1
6	qwer	3
\.


--
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Posts" (id, slug, "categoryId", "subcategoryId", "userId") FROM stdin;
5	postName2	1	2	1
1	tt	1	2	1
16	rrrr	1	2	3
20	yyyy	1	2	3
13	postNameB	3	\N	1
3	postName3	\N	2	1
\.


--
-- Data for Name: Subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Subcategories" (id, slug, "categoryId", "userId") FROM stdin;
2	subcategoryName1	1	1
8	fdsa	3	3
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, password) FROM stdin;
1	george	$2b$10$WfRPlcPqF5ReVrj.dN.KxutUr9Vl6.LBCWJ9ptT1vk2Rj09Q0PGvK
3	michael	$2b$10$b1KOV8D/81TQoFD7l1kp/.dcuXy96qfTBBK/hPVo08yFB5G36C74S
\.


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 6, true);


--
-- Name: Posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Posts_id_seq"', 20, true);


--
-- Name: Subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Subcategories_id_seq"', 8, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 3, true);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Categories Categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_slug_key" UNIQUE (slug);


--
-- Name: Posts Posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_pkey" PRIMARY KEY (id);


--
-- Name: Posts Posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_slug_key" UNIQUE (slug);


--
-- Name: Subcategories Subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subcategories"
    ADD CONSTRAINT "Subcategories_pkey" PRIMARY KEY (id);


--
-- Name: Subcategories Subcategories_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subcategories"
    ADD CONSTRAINT "Subcategories_slug_key" UNIQUE (slug);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Categories Categories_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Posts Posts_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Posts Posts_subcategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES public."Subcategories"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Posts Posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Subcategories Subcategories_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subcategories"
    ADD CONSTRAINT "Subcategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Subcategories Subcategories_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subcategories"
    ADD CONSTRAINT "Subcategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

