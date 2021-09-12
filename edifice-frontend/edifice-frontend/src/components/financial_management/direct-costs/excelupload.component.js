import React, { useState, useEffect } from "react";
import ExcelService from "./../../../services/excelupload.service";
import DirectCostDataService from "./../../../services/directcost.service";
import { Link } from "react-router-dom";
import { Route, useParams } from "react-router-dom";

// excel file upload
const ExcelUploadFiles = (props) => {
  const {id}= useParams();
  
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [directcosts, setDirectCosts] = useState([]);
   
   
  
    const [fileInfos, setFileInfos] = useState([]);
    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };

    const retrieveDirectCosts = () => {
    
      DirectCostDataService.getAll(id)//passing project id as id
        .then((response) => {
          setDirectCosts(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const upload = () => {
        let currentFile = selectedFiles[0];
    
        setProgress(0);
        setCurrentFile(currentFile);
    
        ExcelService.upload(currentFile, (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        })
          .then((response) => {
            setMessage(response.data.message);
            return ExcelService.getFiles();
          })
          .then((files) => {
            setFileInfos(files.data);
          })
          .catch(() => {
            setProgress(0);
            setMessage("Could not upload the file!");
            setCurrentFile(undefined);
          });
    
        setSelectedFiles(undefined);
    };
    useEffect(() => {
        ExcelService.getFiles().then((response) => {
          setFileInfos(response.data);
        });
        retrieveDirectCosts();  

    }, []);
    return (
        <div>
     
          <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Import Direct Costs</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => retrieveDirectCosts()} >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
      <div>
          
          {currentFile && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress + "%" }}
              >
                {progress}%
              </div>
            </div>
          )}
    
          <label className="btn btn-default">
            <input type="file" onChange={selectFile} />
          </label>
    
          <button
            className="btn btn-success"
            disabled={!selectedFiles}
            onClick={upload}
          >
            Upload
          </button>
         
    
          <div className="alert alert-light" role="alert">
            {message}
          </div>

         </div>
                <div className="modal-footer">
   
          <Link  to={"/directcost/"+id} className="btn btn-success">View Direct Costs</Link>
         
                </div>
              </div>
            </div>
    
        </div>
        </div>
    );
  };

export default ExcelUploadFiles;