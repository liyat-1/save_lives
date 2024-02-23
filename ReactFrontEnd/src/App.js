import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UpDateProfile from "./pages/UpDateProfile";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import MyProfile from "./pages/MyProfile";
import SharedLayout from "./pages/SharedLayout";
import PatientListAdmin from "./pages/PatientListAdmin";
import SupportUs from "./pages/SupportUs";
import PatientDetail from "./pages/PatientDetail";
import Payment from "./pages/Payment";
import ShareAdmin from "./pages/ShareAdmin";
import AdminHome from "./pages/AdminHome";
import ApprovedPatientsList from "./pages/ApprovedPatientsList";
import PatientsList from "./pages/PatientsList";
import AdminBlogs from "./pages/AdminBlogs";
import PostPage from "./pages/PostPage";
import Users from "./pages/Users";
import YourPost from "./pages/YourPost";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />

          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="patientlist" element={<PatientsList />} />
          <Route path="supportus" element={<SupportUs />} />
          <Route path="patientdetail" element={<PatientDetail />} />
          <Route path="payment" element={<Payment />} />
          <Route path="post" element={<PostPage />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="yourpost" element={<YourPost />} />
          <Route path="updateprofile" element={<UpDateProfile />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<ShareAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="approvedpatients" element={<ApprovedPatientsList />} />
          <Route path="patients" element={<PatientListAdmin />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
