'use strict'

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        }
    }

    reset() {
        this.setState({
            times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            },
            results: []
        });
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
        this.setState({
            times: this.state.times
        });
    }

    stop() {
        this.setState({
            running: false
        })
        clearInterval(this.watch);
    }

    addList() {
        this.setState({ results: [...this.state.results, <li>{this.format(this.state.times)}</li>] });
    }
    
    render() {
        return ( 
            <div className={'app'}>
             <div className="clockface">
                <div className={'controls'}>
                    <button onClick={() => this.start()}>Start</button>
                    <button onClick={() => this.stop()}>Stop</button>
                </div>
                <div className={'stopwatch'}>
                    {this.format(this.state.times)}
                </div>
                <button onClick={() => this.reset()}>Reset</button>
                <div className={'list'}>
                    <button onClick={() => this.addList()}>Add to list</button>
                    <ul className={'results'}>
                        {this.state.results.map((result, index) => <li key={index}>{result}</li>)}
                    </ul>
                </div>
              </div>  
            </div>
        );
    }
}

const element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}