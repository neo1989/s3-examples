import React from 'react';
import { connect } from 'react-redux';
import { Upload, message, Button, Icon } from 'antd';
import { Card, Col, Row } from 'antd';
import { fetchImages } from './action'




class UploadComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { uploaded } = this.props;

        const uploadProps = {
            name: 'file',
            action: '/image',
            headers: {
                authorization: 'authorization-text',
            },
            showUploadList: false,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    uploaded();
                    message.success(`${info.file.name} 上传成功。`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`);
                }
            },
        };

        return (
                <Upload {...uploadProps}>
                    <Button type="ghost">
                        <Icon type="upload" /> 点击上传
                    </Button>
                </Upload>
        );
    }
}

class Cards extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Row type="flex" align="top">
            {
                this.props.images.map(function(image, id){
                    return (
                        <Col span="4" key={id}>
                            <Card>
                                <div className="custom-image">
                                    <img width="100%" src={image.url} />
                                </div>
                            </Card>
                        </Col>
                    )
                })
            }
            </Row>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.uploaded = this.uploaded.bind(this)
    }
    componentDidMount() {
        const { dispatch } = this.props 
        dispatch(fetchImages())
    }
    uploaded() {
        const { dispatch } = this.props;
        dispatch(fetchImages())
    }
    render() {
        return (
            <div style={{ padding: '30px' }}>
                <div style={{ margin: '10px 0 15px 0' }}>
                    <UploadComponent uploaded={this.uploaded}/>
                </div>
                <div style={{ margin: '0 -8px', padding: '0 8px'}}>
                    <Cards images={this.props.images} />
                </div>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
