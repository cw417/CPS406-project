import {render, screen, fireEvent} from "@testing-library/react";
import Edit from "../pages/Edit";
import {BrowserRouter} from "react-router-dom";
import AdminPage from '../pages/AdminPage';

describe('Tests for AdminPage', () => {


  test('admin page renders', async () => {
    render(<BrowserRouter><AdminPage /></BrowserRouter>);
  });

});