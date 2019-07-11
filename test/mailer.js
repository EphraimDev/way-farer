import { it } from 'mocha';
import {assert} from 'chai';

import Mailer from '../server/utils/mailer';

it('should return true', async (done) => {
    const mail = Mailer.createAccountMessage("a@a.co");

    assert.equal(mail, 'success');
    done()
});

it('should return true', async (done) => {
    const mail = Mailer.sendMail("a@a.co", "hello", "stop");

    assert.equal(mail, 'success');
    done()
});