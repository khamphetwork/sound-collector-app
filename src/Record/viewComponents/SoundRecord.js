import React, {Component} from 'react'
import {ReactHandleRecord} from '../react-record'

import { soundUpload } from "../../firebase/uploadSound";

const allWords = [
    'ສູນ',
    'ຫນຶ່ງ',
    'ສອງ',
    'ສາມ',
    'ສີ່',
    'ຫ້າ',
    'ຫົກ',
    'ເຈັດ',
    'ແປດ',
    'ເກົ້າ',
    'ສິບ',
]

/*
    files = [
        {
            file: blobfile,
            filename: filename,
            word: word
        },
        {...},
        {...},
    ]
*/

export default class SoundRecord extends Component {

	state = {
        allRecordedSound: [],
		record: false,
		wordname: '',
        filename: '',
        files: [],
        count: 3,
        showCount: false,
        allWords: allWords,
        showWord: false,
        word: '',
        justFinishedWord: ''
    }
    
    handleClickStartRecord = () => {
        this.countdown(() => {

            this.recordForOneWord()

        })

    }

    recordForOneWord() {
        if (this.state.allWords[0]) {
            console.log('...in here ')

            let words = this.state.allWords

            let wordShow = words.splice(0, 1)

            this.setState({
                record: true,
                showWord: true,
                word: wordShow,
                allWords: words,
            })
            setTimeout(() => {

                this.setState({
                    record: false,
                    showWord: false,
                    word: '',
                    justFinishedWord: wordShow
                })

                console.log('remain sound ', typeof (this.state.allWords))

                setTimeout(() => {
                    this.recordForOneWord()
                }, 1000)

            }, 1000)
        } else {
            console.log('...all recorded ', this.state.allRecordedSound)
        }

    }

	startRecording = () => {
        this.setState({ record: true })
	}

	stopRecording = () => {
		this.setState ({ record: false })
	}

	onStop = (recordedBlob) => {
		console.log('recordedBlob is: ', recordedBlob)
		
		this.setState({ filename: `test-${Date.now()}` })
		this.setState({wordname: `test`})
		console.log('blob array: ', [recordedBlob.blob])
		var file = new File([recordedBlob.blob], { type: "audio/wav"});
        
        let t_allRecordedSound = this.state.allRecordedSound
        t_allRecordedSound.push({
            file: file,
            blobURL: recordedBlob.blobURL,
            word: this.state.justFinishedWord
        })

        this.setState({
            allRecordedSound: t_allRecordedSound
        })

    }
    
    wordRemove(word, index) {
        let t_allWords = this.state.allWords
        let t_allRecordedSound = this.state.allRecordedSound

        let removedWord = t_allRecordedSound.splice(index, 1)

        t_allWords.push(word)

        this.setState({
            allWords: t_allWords,
            allRecordedSound: t_allRecordedSound
        })
    }

    submitSound() {
        let all = this.state.allRecordedSound
        for (let i = 0; i < all.length; i++) {

            let file = all[i].file
            let dirName = all[i].word
            let fileName = all[i].word + (new Date().getTime())

            soundUpload(file, dirName, fileName, (snapshot, error, msg) => {
                if (error) {
                    console.log('upload error ', msg)
                } else {
                    console.log('snap ', snapshot)

                    if (i === (all.length - 1)) {

                        window.alert("Uploaded!")

                        window.location.reload()
                    }
                }
            })
            
        }
    }

    countdown(callback) {
        this.setState({
            count: 3,
            showCount: true
        })
        setTimeout(() => {
            this.setState({count: 2})

            setTimeout(() => {
                this.setState({ count: 1 })

                setTimeout(() => {
                    this.setState({ count: 0 })

                    setTimeout(() => {
                        this.setState({
                            showCount: false
                        })

                        return callback()

                    }, 1000);

                }, 1000);

            }, 1000);

        }, 1000);
    }

	render() {

        let allRecordedSound = this.state.allRecordedSound

		return (
			<div>
                <div className="row justify-content-center align-self-center" style={{minHeight: '100px'}}>
                    {
                        (this.state.showCount)? 
                            <h2>{this.state.count}</h2> : null
                    }
                    {
                        (this.state.showWord)? 
                            <h2>{this.state.word}</h2> : null
                    }
                </div>
                
                <br/>
				<div className="d-flex row" style={{height: 100 + 'px'}}>
					<ReactHandleRecord
                        className="oscilloscope w-100 h-100"
                        record={this.state.record}
                        backgroundColor="#0275d8"
                        visualSetting="sinewave"
                        audioBitsPerSecond= {512000}
                        onStop={this.onStop}
                        filename={this.state.filename}
                        onStart={this.onStart}
                        strokeColor="#ffffff"
                    />
				</div>
				<br />
				<div className="d-flex row justify-content-center">
					{/* <button
						type="button"
						className="btn btn-lg btn-primary mr-3 col-md" 
						onClick={this.startRecording}
						disabled={(this.state.record)? 'true': ''}
                    > */}
                    <button
                        type="button"
                        className="btn btn-lg btn-primary mr-3 col-md"
                        onClick={this.handleClickStartRecord}
                    >
						ເລີ່ມ
					</button>
					
					{/* <button 
						type="button"
						className="btn btn-lg btn-secondary col-md" 
						onClick={this.stopRecording} 
						disabled={(this.state.record) ? '' : 'true'}
					>
						ຢຸດ
					</button> */}
				</div>
                <br/>
                <br/>
                <hr/>
                <br/>

                <div className="row justify-content-center">
                    <div className="col-12 container-fluid">
                        {
                            allRecordedSound.map((sound, index) => {

                                console.log('iii ', sound)

                                return (
                                    <div key={index} className="row justify-content-center mb-3">
                                        <h5>{sound.word[0] + ": "} &nbsp; </h5>
                                        <audio ref="audioSource" controls="controls" src={sound.blobURL}></audio>
                                        &nbsp;
                                        <button className="btn-warning btn" onClick={() => { this.wordRemove(sound.word[0] ,index)}} >ລຶບ</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <br/>

                {
                    (!this.state.allWords[0])?
                    <div className="row justify-content-center">
                        <button className="btn btn-success" onClick={this.submitSound.bind(this)}>
                            ສຳເລັດ
                        </button>
                    </div> : null
                }

			</div>
		)
	}
}