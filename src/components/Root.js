import React, {Component} from 'react'
import {Button, Container, Grid, Header, Icon, Image, Modal} from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import splunkLogo from '../assets/splunk-logo.jpg';

export default class Root extends Component {
    constructor(args) {
        super(args);
        this.memberList = [
            {
                id: 1,
                url: 'http://chuantu.biz/t6/193/1514860685x-1404764629.png',
            },
            {
                id: 2,
                url: 'http://chuantu.biz/t6/184/1514082819x-1566657643.png',
            },
            {
                id: 3,
                url: 'http://chuantu.biz/t6/194/1514862304x-1404764629.png'
            }
        ];
        this.state = {
            // QR related
            size: 128,
            fgColor: '#000000',
            bgColor: '#ffffff',
            level: 'L',
            // application
            modalOpen: false,
            isStart: false,
            luckyNumber: -1
        };
    }

    //TODO random is somehow not fair
    getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    start = () => {
        this.setState({isStart: true});
        this.timer = setInterval(() => {
            let index = this.getRandomIntInclusive(0, this.memberList.length - 1);
            this.setState({luckyNumber: index});
        }, 100)
    };

    stop = () => {
        this.setState({isStart: false, modalOpen: true, size: 256});
        clearInterval(this.timer);
    }

    handleOpen = () => this.setState({modalOpen: true})

    handleClose = () => this.setState({modalOpen: false, size: 128})


    renderBingoModal = () => {
        if (this.state.luckyNumber < 0) {
            return null;
        }
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                dimmer='blurring'
                size='small'
            >
                <Modal.Header style={{textAlign: 'center'}}>Congratulations!!!</Modal.Header>
                <Modal.Content>
                    <Container textAlign='center'>
                        {this.generateQRCode()}
                        <Modal.Description>
                            <p>Iphone X 256G</p>
                        </Modal.Description>
                    </Container>
                </Modal.Content>
            </Modal>)
    }


    generateQRCode = () => {
        if (this.state.luckyNumber < 0) {
            return null;
        }
        return (
            <QRCode
                value={this.memberList[this.state.luckyNumber].url}
                size={this.state.size}
                fgColor={this.state.fgColor}
                bgColor={this.state.bgColor}
                level={this.state.level}
            />
        )
    }


    render() {
        return (
            <div>
                <div>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='users' circular/>
                        <Header.Content>
                            2018 Splunk Annual Party
                        </Header.Content>
                    </Header>
                    <Image centered size='large' src={splunkLogo}/>
                </div>
                <Grid textAlign='center' style={{margin: '30px'}}>
                    <Grid.Column width={16}>
                        {this.generateQRCode()}
                    </Grid.Column>
                </Grid>
                <Container textAlign='center'>
                    {this.state.isStart ?
                        <Button icon labelPosition='right' color='black' onClick={this.stop}>
                            Bingo!
                            <Icon name='trophy'/>
                        </Button>
                        :
                        <Button icon labelPosition='right' color='black' onClick={this.start}>
                            Start!
                            <Icon name='rocket'/>
                        </Button>}
                </Container>
                {this.renderBingoModal()}
            </div>
        )
    }
}