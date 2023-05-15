import { Router } from 'express';

import signUp from './signUp';
import signIn from './signIn';
import signOut from './signOut';
import currentUser from './currentUser';

const router = Router();


router.use("/signUp", signUp);
router.use("/signIn", signIn);
router.use("/signOut", signOut);
router.use('/currentuser', currentUser);


export default router;