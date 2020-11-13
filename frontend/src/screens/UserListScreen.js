import React, { useContext, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Spinnerr from "../components/Spinnerr";
import FormContainer from "../components/FormContainer";
import { UserContext } from "../userContext/userState";

const UserListScreen = ({ history }) => {
  const context = useContext(UserContext);
  const {
    getUserList,
    users,
    userInfo,
    loading,
    error,
    deleteUser,
    success,
  } = context;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getUserList();
    } else {
      history.push("/login");
    }
  }, [history, userInfo, success]);

  const deleteHandler = (id) => {
    //EDIT CONFIRMATION SCREEN AS MODAL !! ITD LOOK BETTER
    if (window.confirm("Are you Sure ?")) {
      deleteUser(id);
    }
  };
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Spinnerr />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
