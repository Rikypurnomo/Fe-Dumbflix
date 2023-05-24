import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import TableTransaction from "./pages/IncomeTransaction";
import Home from "./pages/Home";
import TvShow from "./pages/TvShow";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovies";
import Detail from "./pages/DetailCards";
import Payment from "./pages/Payment";
import "./App.css";
import ListFilms from "./pages/ListFilms";
import UpdateMovie from "./pages/UpdateMovie";
import AddEpisod from "./pages/AddEpisod";
import UpdateEpisod from "./pages/UpdateEpisod";
// import { AdminRoute, UserRoute } from "./component/PrivateRoute";


export default function App() {
  return (
    <>
      <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tvshows" element={<TvShow />} />
            <Route path="/addmovies" element={<AddMovie />} />
            <Route path="/listfilms" element={<ListFilms/>} />
            <Route path="/updatemovie/:id" element={<UpdateMovie/>} />
            <Route path="/addepisod" element={<AddEpisod/>} />
            <Route path="/updateepisod" element={<UpdateEpisod/>} />
            <Route path="/tabletransaction" element={<TableTransaction />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}
