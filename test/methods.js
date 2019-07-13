import { it } from 'mocha';
import {assert} from 'chai';
import nodemailer from 'nodemailer';

import Mailer from '../server/utils/mailer';
import BookingController from '../server/controller/booking';
import upload from '../server/utils/cloudinary';

it('should return success', async (done) => {
    const mail = Mailer.createAccountMessage("a@a.co");

    assert.equal(mail, 'success');
    done()
});

it('should return undefined', async () => {
    const bookings = [
        {seat_number: 1},
        {seat_number: 2},
        {seat_number:3}
    ]
    const book = await BookingController.checkSeat(bookings, 4);

    assert.equal(book, undefined);
});

it('should return seat number', async () => {

    const book = await BookingController.fetchSeat([1,2,3], [1]);

    assert.equal(book, 2);
});

it('should return seat number', async () => {
    const bookings = [
        {seat_number: 1},
        {seat_number: 2},
        {seat_number:3}
    ]
    const book = await BookingController.assignSeatNumber(bookings, 5);

    assert.equal(book, 4);
});

it('should return false', async () => {
    const trip = await BookingController.findTrip(5);

    assert.equal(trip, false);
});

it('should return false', async () => {
    const req = '1562914819676pic.jpg';
    const cloud = await upload(req);

    assert.equal(cloud, false);
});
