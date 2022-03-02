import bcrypt from 'bcrypt';
import { catchAsync } from '../utils/catch-async.js';
import { User } from '../models/user-model.js';

const logInUser = async (req, res) => {
    const { body } = req;

    const user = await User.findOne({ email: body.email });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);

        if (validPassword) {
            user.password = undefined;
            res.status(200).json({ data: { user }, message: 'Valid password' });
        } else {
            res.status(400).json({ error: 'Invalid Password' });
        }
    } else {
        res.status(401).json({ error: 'User does not exist' });
    }
};

const signUpUser = catchAsync(async (req, res, next) => {
    const { body } = req;

    // creating a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
});

export { logInUser, signUpUser };
