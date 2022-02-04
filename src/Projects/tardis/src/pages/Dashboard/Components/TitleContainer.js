import React, { useState, useEffect } from "react";
import "../Dashboard.scss";
import { DropDown, DateRanger, Reset, Button } from "../../../components";
import { Images } from "../../../assets/images";
import SVG from 'react-inlinesvg';
import moment from 'moment'
import Modal from "react-modal";
import { customStyles } from "../../../assets/constant";
import { fullscreen, ActionUpdate, fetch } from '../../../utils'
import CreateDashboard from "./CreateDashboard"
import { useHistory } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import query from '../../../assets/constant/query'
import { SetFullScreen } from "../../../../../../reducers/user/actions"

const TitleContainer = props => {
    const dashboard = useSelector(state => state.dashboard);
    const userdata = useSelector(state => state.user);
    const [reset, setReset] = useState(false);
    const [fs, setFS] = useState(userdata.fullscreen);
    const [resetDate, setResetDate] = useState(false);
    const [daterange, SetRange] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [modalIsOpen, SetModal] = useState(false);
    const closeModal = () => {
        SetModal(false);
    };
    const openModal = () => {
        SetModal(true);
    };
    let history = useHistory();
    const onSubmit = async (request) => {
        setLoading(true);
        var response = await fetch(query.createDashboard(request))
        ActionUpdate(response, request, "Add", (e) => {
            closeModal();
            history.push("/tardis/Profile");
        })
        setLoading(false);
    }
    useEffect(() => {
        if (daterange) {
            let startdate = moment(daterange.start);
            let enddate = moment(daterange.end);
            if (daterange.start !== null && daterange.end) {
                props.DateRange({ startdate, enddate })
            }
        }
    }, [daterange])

    const onFilterChange = (value) => {
        let result = [];
        for (let x in value) {
            result.push(value[x].source)
        }
        if (result.length === 0)
            result = false;
        props.LoadRecords({ filterSource: result })
    }


    const onReset = () => {
        setResetDate(false);
        props.LoadRecords({ filterSource: false, dateFilter: false });
        setReset(true);
        setTimeout(() => {
            setResetDate(true);
        })
    }
    return (
        <div className="container-title">
            <div className="titleleft">
                <DropDown
                    id={"sourcedd"}
                    class={"options searchop"}
                    label={"Source"}
                    search={true}
                    multi={true}
                    reset={reset}
                    loading={dashboard.isLoading}
                    displaynode={"source"}
                    onClick={() => setReset(false)}
                    imguri={Images.dropdownarrow}
                    onFilterselect={(list) => { onFilterChange(list) }}
                    options={dashboard.fullSourceList}
                    selectedValues={dashboard ? dashboard.sourceList : false}
                />
                <span className="title">{props.name}</span>
                <Reset onClick={() => onReset()} isactive={dashboard.filter || dashboard.dateFilter} />
            </div>
            <div className="titleright">
                <StatusHolder count={dashboard.successCount} label={"Success"} margin={"40"} />
                <StatusHolder count={dashboard.failureCount} label={"Failure"} margin={"40"} />
                <StatusHolder count={dashboard.delayCount} label={"Delay"} margin={"20"} />
                <Button
                    class={"fullscreenicon"}
                    leftimg={fs ? Images.minimize : Images.Fullscreen}
                    svg={true}
                    onClick={() => {
                        fullscreen((e) => {
                            SetFullScreen(e)
                            setFS(e)
                        });
                    }}
                />
            </div>

            <div className="dashborad-control" >
                <DateRanger onChange={(data) => { SetRange(data) }} resetDate={resetDate}>
                    <SVG src={Images.calendardetails} className="dontclose" />
                </DateRanger>
                <div className="calendar" onClick={() => { openModal() }}>
                    <span className="lable">Create Dashboard</span>
                    <div className="plus">
                        <span>&#43;</span></div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Dashboard"
            >
                <CreateDashboard
                    closepop={() => {
                        closeModal();
                    }}
                    onSubmit={(data) => {
                        onSubmit(data)
                    }}
                    isLoading={isLoading}
                    source={dashboard.fullSourceList}
                />
            </Modal>
        </div>
    );
};

const StatusHolder = (props) => {
    return <div className={`holder margin${props.margin}`}>
        <div className={`statuscircle ${props.label.toLowerCase()}`}>
            <span>{props.count}</span>
        </div>
        <span className="statustxt">{props.label}</span>
    </div>
}

export default connect(
    null, { SetFullScreen }
)(TitleContainer);