"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const api = (0, supertest_1.default)(__1.server);
const User_1 = require("../models/User");
const Event_1 = require("../models/Event");
const initialUsers = [
    {
        email: 'root@gmail.com',
        password: 'root',
        fullName: 'root root',
        nameOfPet: 'rootPet',
        position: 'ST',
    },
    {
        email: 'rootTwo@gmail.com',
        password: 'rootTwo',
        fullName: 'rootTwo rootTwo',
        nameOfPet: 'rootTwoPet',
        position: 'Gk',
    },
];
describe('User', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.User.deleteMany({});
        for (let user of initialUsers) {
            yield api.post('/register').send(user);
        }
    }));
    // USER //
    describe('register', () => {
        test('register ', () => __awaiter(void 0, void 0, void 0, function* () {
            yield User_1.User.deleteMany({});
            yield api.post('/register').send(initialUsers[0]);
            const users = yield User_1.User.find({});
            expect(users.length).toBe(1);
            expect(users[0].email).toBe(initialUsers[0].email);
        }));
    });
    describe('login', () => {
        test('login first time', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.post('/login').send({
                email: initialUsers[0].email,
                password: initialUsers[0].password,
            });
            expect(response.status).toBe(200);
            expect(response.body.accessToken).toBeDefined();
        }));
        test('login with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.post('/login').send({
                email: initialUsers[0].email,
                password: initialUsers[1].password,
            });
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('password incorrect');
        }));
    });
});
// USER //
// EVENT //
describe('events', () => {
    let eventId = '';
    ///
    test('createEvent', () => __awaiter(void 0, void 0, void 0, function* () {
        Event_1.Event.deleteMany({});
        const accessToken = // root accessToken
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJyb290IHJvb3QiLCJpZCI6Ik5nVHRESWlSeXg0QzVmbXB3Vmo4ViIsInBvc2l0aW9uIjoiU1QiLCJpYXQiOjE2NDYwNjU2MjZ9.7jiVEZxlyHCKes_7Zf_pgtix-IIim3yuoomXIWf775E';
        const event = yield api
            .post('/Event/create')
            .send({
            location: 'location',
            date: new Date(),
            imgSrc: 'imgSrc',
            adress: 'adress',
        })
            .set('Authorization', `Bearer ${accessToken}`);
        eventId = event.body._id;
        const events = yield Event_1.Event.find({});
        expect(event.status).toBe(200);
        expect(event.body.location).toBe(events[0].location);
        expect(event.body.creator.fullName).toBe(events[0].creator.fullName);
    }));
    ////
    test('remove player', () => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = // root accessToken
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJyb290IHJvb3QiLCJpZCI6Ik5nVHRESWlSeXg0QzVmbXB3Vmo4ViIsInBvc2l0aW9uIjoiU1QiLCJpYXQiOjE2NDYwNjU2MjZ9.7jiVEZxlyHCKes_7Zf_pgtix-IIim3yuoomXIWf775E';
        const event = yield api
            .post('/Event/addPlayer')
            .send({ eventId })
            .set('Authorization', `Bearer ${accessToken}`);
        const events = yield Event_1.Event.find({});
        console.log(events[0]);
        expect(events[0].Players.length).toBe(0);
    }));
    ///
    test('delete event', () => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = // root accessToken
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJyb290IHJvb3QiLCJpZCI6Ik5nVHRESWlSeXg0QzVmbXB3Vmo4ViIsInBvc2l0aW9uIjoiU1QiLCJpYXQiOjE2NDYwNjU2MjZ9.7jiVEZxlyHCKes_7Zf_pgtix-IIim3yuoomXIWf775E';
        const event = yield api
            .delete('/Event/deleteEvent')
            .send({ eventId })
            .set('Authorization', `Bearer ${accessToken}`);
        const events = yield Event_1.Event.find({});
        expect(events.length).toBe(0);
    }));
});
// EVENT //
afterAll(() => {
    mongoose_1.default.connection.close();
});
