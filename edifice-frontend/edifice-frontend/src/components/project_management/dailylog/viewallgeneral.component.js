import React, { Component } from "react";
import { Link } from "react-router-dom";
import DLGeneralService from "../../../services/project_management/dlgeneral.service";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Table from "react-bootstrap/Table";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined';

class ViewDGLall extends Component {
  constructor(props) {
    super(props);
    this.retrieveDLall = this.retrieveDLall.bind(this);
    this.deleteGeneralLog = this.deleteGeneralLog.bind(this);
    this.state = {
      projectId: this.props.match.params.id,
      dglall: [],
    };
  }

  componentDidMount() {
    this.retrieveDLall(this.props.match.params.id);
  }

  retrieveDLall(id) {
    DLGeneralService.getAll(id).then((response) => {
      this.setState({
        dglall: response.data,
      });
    });
  }

  deleteGeneralLog(accidentid) {
    var data = {
      isDeleted: 1,
    };
    DLGeneralService.update(accidentid, data).then((response) => {
    //   window.location.reload();
    });
  }

  render() {
    const { projectId, dglall } = this.state;
    return (
      <div>
        <h2>View All Accident Logs</h2>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/home">
            Home
          </Link>
          <Link color="inherit" to={"/projectmanagementhome/" + projectId}>
            App Dashboard
          </Link>
          <Link color="inherit" to={"/dailylogs/" + projectId}>
            Daily Log
          </Link>
          <Link color="inherit" aria-current="page" className="disabledLink">
            View All Accident Logs
          </Link>
        </Breadcrumbs>
        <hr />
        <h5 className="mb-3">
        <ClearAllOutlinedIcon/> To track what happpened onsite
        </h5>
        <Table striped bordered hover variant="" responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dglall &&
              dglall.map((da, index) => (
                <tr key={index}>
                  <td>{da.date}</td>
                  <td>{da.time}</td>
                  <td>{da.crew}</td>
                  <td>{da.description}</td>
                  <td>
                    <Link to={"/viewgenerallog/" + projectId + "/" + da.id}>
                      <button className="btn btn-success mr-2">
                        {" "}
                        View <VisibilityIcon />
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger mr-2"
                      id="updateBtn"
                      data-target="#deletegeneralModal"
                      data-toggle="modal"
                    >
                      Delete <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {/* Delete accident modal Starts */}
        <div
          className="modal fade"
          id="deletegeneralModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title" id="exampleModalCenterTitle">
                  Are you sure you want to delete?
                </p>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <a
                  className="btn btn-danger pr-3 ml-2 mr-3"
                  onClick={this.deleteGeneralLog(dglall.id)}
                  data-dismiss="modal"
                >
                  {" "}
                  Yes, Delete
                </a>
                <a
                  className="btn btn-secondary ml-6 mr-6 pl-3"
                  id="deleteModalDismiss"
                  data-dismiss="modal"
                >
                  {" "}
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Delete accident modal Ends */}
      </div>
    );
  }
}

export default ViewDGLall;