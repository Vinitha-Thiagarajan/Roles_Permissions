import React, { useEffect, useState } from "react";
import { Table, TitleContainer, Loader, DetailPDF, Button } from "../../components";
import { Images } from "../../assets/images";
import { useHistory, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Layout from '../../Layout';
import "./Details.scss"
import { SourceFetch } from "../../../../../reducers/dashdetails/actions"
import html2pdf from "html2pdf.js"
import Modal from "react-modal";
import moment from "moment";
import { customExportStyles } from "../../assets/constant";

const Detail = (props) => {
  const detail = useSelector(state => state.detail);
  const { isLoading } = detail;
  let history = useHistory();
  let params = useParams();
  const detailrec = history.location.state;
  const [modalIsOpen, SetModal] = useState(false);
  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };

  const onBackHandler = () => {
    history.push({ pathname: "/tardis/dashboard", state: "detailback" });
  };
  useEffect(() => {
    if (detailrec)
      props.SourceFetch(detailrec);
    else {
      if (params.logdate && params.sourcename) {
        let detailroute = {
          logdate: params.logdate,
          source: {
            source: params.sourcename
          }
        }
        props.SourceFetch(detailroute);
      }

    }
  }, [])
  const exportClick = () => {
    openModal();
  }
  return (
    <Layout>
      <div className="DetailPage page" >
        <TitleContainer
          name="Health Dashboard"
          img={Images.Dashboard}
          onBack={() => {
            onBackHandler();
          }}
        >
          <div className="export centeralign"><div className="exportbtn" onClick={exportClick}>Export Data</div></div>
        </TitleContainer>
        {isLoading ? <Loader /> :
          <Table name="SourceDetailed" dataSource={detail} />}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customExportStyles}
        contentLabel="Export PDF"
      >
        <div className="download-container">
          <span className="title">Preview</span>
          <Button
            class="submitbtn"
            label="Download PDF"
            onClick={() => {
              window.scrollTo(0, 0);
              var element = document.getElementById('exportpdf');
              var opt = {
                margin: 1,
                filename: 'GeneralTrend.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', putOnlyUsedFonts: true }
              };
              html2pdf().set(opt).from(element).save();
            }} />
        </div>

        <DetailPDF headers={["GROUP NAME", `LOG DATE (${detailrec ? moment(detailrec.logdate).format("DD/MM/YYYY") : ""})`, "TIMESTAMP", "COMMENTS"]} data={detail.data} />

      </Modal>
    </Layout>
  );
};


export default connect(
  null, { SourceFetch }
)(Detail);