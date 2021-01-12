import React, {Component} from 'react';
import Container from './Container';
import Footer from './Footer';
import {getAllStudents} from './client';
import AddStudentForm from "./forms/AddStudentForm";
import {Table, Avatar, Modal, Spin, Empty} from 'antd';
import { LoadingOutlined} from '@ant-design/icons';
import {errorNotification} from "./Notification";

import './App.css';

/*

Spinning icon while waiting to fetch the data

*/

const getIndicator = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

    state = {
        students: [],
        isFetching: false,
        isAddStudentModalVisible: false
    }

    componentDidMount() {
        this.fetchStudents();
    }

    /*
    
    Working with the modal => open and close methods
    
    */

    openAddStudentModal = () => this.setState({isAddStudentModalVisible: true});

    closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false});


    /*
    Fetching the data from the DB and setting the state    
    */

    fetchStudents = () => {
        this.setState({isFetchig: true});
        getAllStudents()
            .then(response => response.json()
                .then(students => {
                    this.setState({students, isFetching: false});
                }))
            .catch(error => {
                const errorMessage = error.error.message;
                const descr = "Holly cow mate smth wrong happened...";
                errorNotification(errorMessage, descr);
                this.setState({isFetching: false});
            });
    }

    render() {

        const {students, isFetching, isAddStudentModalVisible} = this.state;
        
        /*
        
        Common elements display => modal, register form and footer
        
        */

        const commonElements = () => (
            <div>
                <Modal
                    title="Add new student"
                    visible={isAddStudentModalVisible}
                    onOk={this.closeAddStudentModal}
                    onCancel={this.closeAddStudentModal}
                    width={1000}
                >
                    <h1>Add new student here</h1>
                    <AddStudentForm
                        onSuccess={() => {
                            this.closeAddStudentModal();
                            this.fetchStudents();
                        }}
                        onFailure={(err) => {
                            console.log(JSON.stringify(err));
                            errorNotification("err", "zee");
                        }}
                    />
                </Modal>
                <Footer
                    numberOfStudents={students.length}
                    handleAddStudentClickEvent={this.openAddStudentModal}
                />
            </div>
        );

        /*
        Show spinning icon while waiting to fetch the students
        */

        if (isFetching) {
            return (
                <Container>
                    <Spin indicator={getIndicator()}/>
                </Container>
            );
        }
        
        /*
        
        Show the table when the students are fetched
        
        */

        if (students && students.length) {

            const columns = [
                {
                    title: "",
                    key: "avatar",
                    render: (text, student) => (
                        <Avatar
                            size="large"
                        >
                            {`${student.firstName.charAt(0).toUpperCase()}`}
                            {`${student.lastName.charAt(0).toUpperCase()}`}
                        </Avatar>
                    )
                },
                {
                    title: "Student Id",
                    dataIndex: "studentId",
                    key: "studentId"
                },
                {
                    title: "First Name",
                    dataIndex: "firstName",
                    key: "firstName"
                },
                {
                    title: "Last Name",
                    dataIndex: "lastName",
                    key: "lastName"
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: "Gender",
                    dataIndex: "gender",
                    key: "gender"
                }
            ];

            return (
                <Container>
                    <Table
                        style={{marginBottom: "100px"}}
                        dataSource={students}
                        columns={columns}
                        pagination={false}
                        rowKey='studentsId'
                    />
                    {commonElements()}
                </Container>

            );
        }

        /*
        
        Show empty page if no students found in the DB
        
        */
        return (<Container>
                <Empty
                    description={
                        <span>No students found </span>
                    }
                />
                {commonElements()}
            </Container>
        );
    }
}

export default App;
