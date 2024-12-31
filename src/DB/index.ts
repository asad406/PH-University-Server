import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'facetubesub@gmail.com',
  password: config.super_admin_password,
  role: 'superAdmin',
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  // when database is connected , we will check is there any user who is super admin
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};
export default seedSuperAdmin;
