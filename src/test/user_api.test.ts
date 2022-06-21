// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import supertest from 'supertest';
import { server } from '..';
const api = supertest(server);
import { User } from '../models/User';
import { Event } from '../models/Event';

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
  beforeEach(async () => {
    await User.deleteMany({});
    for (let user of initialUsers) {
      await api.post('/register').send(user);
    }
  });

  // USER //

  describe('register', () => {
    test('register ', async () => {
      await User.deleteMany({});
      await api.post('/register').send(initialUsers[0]);
      const users = await User.find({});
      expect(users.length).toBe(1);
      expect(users[0].email).toBe(initialUsers[0].email);
    });
  });

  describe('login', () => {
    test('login first time', async () => {
      const response = await api.post('/login').send({
        email: initialUsers[0].email,
        password: initialUsers[0].password,
      });
      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBeDefined();
    });

    test('login with incorrect password', async () => {
      const response = await api.post('/login').send({
        email: initialUsers[0].email,
        password: initialUsers[1].password,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('password incorrect');
    });
  });
});
// USER //

// EVENT //
describe('events', () => {
  let eventId = '';
  ///

  test('createEvent', async () => {
    Event.deleteMany({});
    const accessToken = // root accessToken
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJyb290IHJvb3QiLCJpZCI6Ik5nVHRESWlSeXg0QzVmbXB3Vmo4ViIsInBvc2l0aW9uIjoiU1QiLCJpYXQiOjE2NDYwNjU2MjZ9.7jiVEZxlyHCKes_7Zf_pgtix-IIim3yuoomXIWf775E';
    const event = await api
      .post('/Event/create')
      .send({
        location: 'location',
        date: new Date(),
        imgSrc: 'imgSrc',
        adress: 'adress',
      })
      .set('Authorization', `Bearer ${accessToken}`);
    eventId = event.body._id;
    const events = await Event.find({});
    expect(event.status).toBe(200);
    expect(event.body.location).toBe(events[0].location);

    expect(event.body.creator.fullName).toBe(events[0].creator.fullName);
  });

  ////

  test('remove player', async () => {
    const accessToken = // root accessToken
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJyb290IHJvb3QiLCJpZCI6Ik5nVHRESWlSeXg0QzVmbXB3Vmo4ViIsInBvc2l0aW9uIjoiU1QiLCJpYXQiOjE2NDYwNjU2MjZ9.7jiVEZxlyHCKes_7Zf_pgtix-IIim3yuoomXIWf775E';
    const event = await api
      .post('/Event/addPlayer')
      .send({ eventId })
      .set('Authorization', `Bearer ${accessToken}`);
    const events = await Event.find({});
    console.log(events[0]);
    expect(events[0].Players.length).toBe(0);
  });

  ///

  test('delete event', async () => {
    const accessToken = // root accessToken
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJyb290IHJvb3QiLCJpZCI6Ik5nVHRESWlSeXg0QzVmbXB3Vmo4ViIsInBvc2l0aW9uIjoiU1QiLCJpYXQiOjE2NDYwNjU2MjZ9.7jiVEZxlyHCKes_7Zf_pgtix-IIim3yuoomXIWf775E';
    const event = await api
      .delete('/Event/deleteEvent')
      .send({ eventId })
      .set('Authorization', `Bearer ${accessToken}`);
    const events = await Event.find({});
    expect(events.length).toBe(0);
  });
});
// EVENT //
afterAll(() => {
  mongoose.connection.close();
});
