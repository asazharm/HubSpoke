import React, {Component} from 'react'
import styles from './map.module.css'
import mapImg from './COVID-19_Outbreak_Cases_in_Armenia_(Density).svg'

class Map extends Component {

    state = {
        isClicked: false,
        district: undefined
    }

    render() {
        let viewBox
        let svgClass
        let districts
        let cities

        if (this.state.isClicked) {
            viewBox = "0 0 750 750"
            svgClass = styles.svgFull

            cities = this.state.district.cities.map(
                (city) => {
                    return (<g>
                                <circle cx={city.cityX}
                                        cy={city.cityY}
                                        r="3"
                                        cityColor = {this.state.district.color}
                                        className={styles.city}
                                />

                                <text x={Number(city.cityX)}
                                    y={Number(city.cityY) - 10}

                                    className={styles.cityName}>

                                    {city.cityName}
                                </text>
                                {/*<line x1 = {city.cityX}*/}
                                {/*      y1 = {city.cityY}*/}
                                {/*      x2 = {this.state.district.capital.fullCapitalX}*/}
                                {/*      y2 = {this.state.district.capital.fullCapitalY}*/}
                                {/*      stroke = "black"*/}
                                {/*      className={styles.line}*/}
                                {/*    >*/}

                                {/*</line>*/}
                            </g>
                    )
                }
            )

            districts = <svg>

                            <path onClick={this.handleClick}
                                  key = {this.state.district.name}
                                  className={styles.clicked}
                                  d = {this.state.district.coordsFull} />

                            {cities}

                        </svg>

        } else {
            viewBox = "0 0 680 680"
            svgClass = styles.svgState

            districts = this.props.districts.map(
                    (district) => {
                        return(<svg className={styles.state}>
                                <title>{district.capital.capitalName}</title>
                                    <path onClick={this.handleClick.bind(null, district)}
                                          key = {district.name}
                                          className={styles.statePath}
                                          d = {district.coords}
                                          districtColor = {district.color}/>

                                    <circle cx={district.capital.capitalX + 100}
                                            cy={district.capital.capitalY}
                                            className={styles.stateCenter}
                                            r="2"/>)
                                        <text
                                        x={Number(district.capital.capitalX)}
                                          y={Number(district.capital.capitalY) - 10}
                                          className={styles.stateName}>

                                        {district.capital.capitalName}
                                        </text>
                                    <filter id="dropShadow">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                                        <feOffset dx="2" dy="2" />
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </svg>
                            )
                        })
                }





        return(<div className={styles.map}>
            <svg viewBox={viewBox} className={svgClass}>
                        {districts}
            </svg>
            </div>

        )
    }

    handleClick = (district) => {
        this.setState({
            isClicked: !this.state.isClicked,
            district: district
        })
    }
}


export default Map