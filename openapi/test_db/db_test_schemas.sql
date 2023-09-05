--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.ar_internal_metadata OWNER TO dna_synthesis_backend_user;

--
-- Name: machines; Type: TABLE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE TABLE public.machines (
    id bigint NOT NULL,
    model_id bigint NOT NULL,
    location character varying NOT NULL,
    status integer NOT NULL,
    synthesis_total_cycles integer,
    synthesis_completed_cycles integer,
    synthesis_current_step integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    current_order_id bigint
);


ALTER TABLE public.machines OWNER TO dna_synthesis_backend_user;

--
-- Name: machines_id_seq; Type: SEQUENCE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE SEQUENCE public.machines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.machines_id_seq OWNER TO dna_synthesis_backend_user;

--
-- Name: machines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER SEQUENCE public.machines_id_seq OWNED BY public.machines.id;


--
-- Name: models; Type: TABLE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE TABLE public.models (
    id bigint NOT NULL,
    name character varying NOT NULL,
    well_array_rows integer NOT NULL,
    well_array_cols integer NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.models OWNER TO dna_synthesis_backend_user;

--
-- Name: models_id_seq; Type: SEQUENCE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE SEQUENCE public.models_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.models_id_seq OWNER TO dna_synthesis_backend_user;

--
-- Name: models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER SEQUENCE public.models_id_seq OWNED BY public.models.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    oligos text[] DEFAULT '{}'::text[] NOT NULL,
    status integer NOT NULL,
    machine_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO dna_synthesis_backend_user;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO dna_synthesis_backend_user;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO dna_synthesis_backend_user;

--
-- Name: wells; Type: TABLE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE TABLE public.wells (
    id bigint NOT NULL,
    "row" integer NOT NULL,
    col integer NOT NULL,
    status integer NOT NULL,
    machine_id bigint NOT NULL,
    oligo character varying,
    total_cycles integer,
    synthetized_nucleotide_count integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.wells OWNER TO dna_synthesis_backend_user;

--
-- Name: wells_id_seq; Type: SEQUENCE; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE SEQUENCE public.wells_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wells_id_seq OWNER TO dna_synthesis_backend_user;

--
-- Name: wells_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER SEQUENCE public.wells_id_seq OWNED BY public.wells.id;


--
-- Name: machines id; Type: DEFAULT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.machines ALTER COLUMN id SET DEFAULT nextval('public.machines_id_seq'::regclass);


--
-- Name: models id; Type: DEFAULT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.models ALTER COLUMN id SET DEFAULT nextval('public.models_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: wells id; Type: DEFAULT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.wells ALTER COLUMN id SET DEFAULT nextval('public.wells_id_seq'::regclass);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: machines machines_pkey; Type: CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT machines_pkey PRIMARY KEY (id);


--
-- Name: models models_pkey; Type: CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.models
    ADD CONSTRAINT models_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: wells wells_pkey; Type: CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.wells
    ADD CONSTRAINT wells_pkey PRIMARY KEY (id);


--
-- Name: index_machines_on_current_order_id; Type: INDEX; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE INDEX index_machines_on_current_order_id ON public.machines USING btree (current_order_id);


--
-- Name: index_machines_on_model_id; Type: INDEX; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE INDEX index_machines_on_model_id ON public.machines USING btree (model_id);


--
-- Name: index_orders_on_machine_id; Type: INDEX; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE INDEX index_orders_on_machine_id ON public.orders USING btree (machine_id);


--
-- Name: index_wells_on_machine_id; Type: INDEX; Schema: public; Owner: dna_synthesis_backend_user
--

CREATE INDEX index_wells_on_machine_id ON public.wells USING btree (machine_id);


--
-- Name: machines fk_rails_1b7060dbc6; Type: FK CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT fk_rails_1b7060dbc6 FOREIGN KEY (current_order_id) REFERENCES public.orders(id);


--
-- Name: machines fk_rails_51cc6470f9; Type: FK CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT fk_rails_51cc6470f9 FOREIGN KEY (model_id) REFERENCES public.models(id);


--
-- Name: orders fk_rails_a73722acec; Type: FK CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_rails_a73722acec FOREIGN KEY (machine_id) REFERENCES public.machines(id);


--
-- Name: wells fk_rails_d8b9a2ca1d; Type: FK CONSTRAINT; Schema: public; Owner: dna_synthesis_backend_user
--

ALTER TABLE ONLY public.wells
    ADD CONSTRAINT fk_rails_d8b9a2ca1d FOREIGN KEY (machine_id) REFERENCES public.machines(id);


--
-- PostgreSQL database dump complete
--

