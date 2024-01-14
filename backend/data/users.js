import bcrypt from 'bcrypt';

const users = [
    {
        name: "haseeb shaikh",
        email: "haseebshaikh25ks@gmail.com",
        password: bcrypt.hashSync("haseebAdmin", 10),
        isAdmin: true
    },
    {
        name: "hanzala shaikh",
        email: "hanzalashaikh@gmail.com",
        password: bcrypt.hashSync("hnnzlie", 10),
        isAdmin: false
    },
    {
        name: "aaquib shaikh",
        email: "aaquibshaikh@gmail.com",
        password: bcrypt.hashSync("hnnzlie", 10),
        isAdmin: false
    },
];

export default users;
