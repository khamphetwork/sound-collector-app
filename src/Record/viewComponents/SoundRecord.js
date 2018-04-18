import React, {Component} from 'react'
import {ReactHandleRecord} from '../react-record'
import 'isomorphic-fetch'

var allWords = [
    'ສະບາຍດີ',
    'ຂ້ອຍ',
    'ກິນ'
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
		blobURL: null,
		record: false,
		wordname: '',
        filename: '',
        files: [],
        count: 3,
        showCount: false,
        allWords: allWords,
        showWord: false,
        word: ''
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
                allWords: words
            })
            setTimeout(() => {

                this.setState({
                    record: false,
                    showWord: false,
                    word: ''
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
		this.setState({
			blobURL: recordedBlob.blobURL
		})
		console.log('recordedBlob is: ', recordedBlob)
		
		this.setState({ filename: `test-${Date.now()}` })
		this.setState({wordname: `test`})
		console.log('blob array: ', [recordedBlob.blob])
		var file = new File([recordedBlob.blob], { type: "audio/wav"});
        
        let t_allRecordedSound = this.state.allRecordedSound
        t_allRecordedSound.push(file)

        this.setState({
            allRecordedSound: t_allRecordedSound
        })

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
		return (
			<div>
                {
                    (this.state.showCount)? 
                    <div className="row">
                        {this.state.count}
                    </div> : null
                }
                {
                    (this.state.showWord)? 
                    <div className="row">
                        {this.state.word}
                    </div> : null
                }
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
					
					<button 
						type="button"
						className="btn btn-lg btn-secondary col-md" 
						onClick={this.stopRecording} 
						disabled={(this.state.record) ? '' : 'true'}
					>
						ຢຸດ
					</button>
				</div>
			</div>
		)
	}
}