import { Login, Profile, Register } from "../pages";
import { AddGig } from '../components'
export const authRoutes = [
    {path : "/login", element : <Login />},
    {path : "/register", element : <Register />}
]

export const authContents = [
    { path : "/add-gig", element : <AddGig />},
    { path : "/edit-gig/:id", element : <AddGig />},
    {path : '/my-profile', element : <Profile />}
];