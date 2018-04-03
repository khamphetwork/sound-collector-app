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
		blobURL: null,
		record: false,
		wordname: '',
        filename: '',
        files: [],
        count: 3,
        showCount: false,
    }
    
    handleClickStartRecord = () => {
        this.countdown(() => {
            console.log('record treuuuuuuuu')
            // this.setState({ record: true })
        })

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
		var url = `/upload/${this.state.wordname}/${this.state.filename}`
		this.xhr(url, file);
	}

		// let tmpLink = document.createElement('a')
		// tmpLink.href = blob.blobURL
		// tmpLink.setAttribute('download', 'test1.wav')
		// tmpLink.click()

	// XHR2/FormData
	xhr(url, data) {
		var request = new XMLHttpRequest();
		request.open('POST', url);
		var formData = new FormData();
		formData.append('file', data);
		request.send(formData);
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
                    this.setState({
                        count: 0,
                        showCount: false
                    })

                    return callback()

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