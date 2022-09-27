import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { GiWaterDrop } from 'react-icons/gi'
import { RiCloudWindyFill } from 'react-icons/ri'
import { AiFillCompass } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { BsMoonStarsFill } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import './home.css'

const Home = () => {

    const [ cidadePesquisada, setCidadePesquisada ] = useState('')
    const [ cidade, setCidade ] = useState('')
    const [ tempo, setTempo ] = useState(null)



    const handleChange = (e) => {
        setCidade(e.target.value)
    }

    const handleSearch = () => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=2e13aaa5c4b4400f9e2224617221603&q=${cidade}&lang=pt`)
        .then((response) => {
            if(response.status == 200) {
                return response.json()
            }
        })
        .then((data) => {
            console.log(data)
            setTempo(data)
        })

        setCidadePesquisada(cidade)

    }



  return (
    <div>
        <div className="header">
            <input 
            type="text" 
            placeholder='Ex: João Pessoa' 
            value={cidade} 
            onChange={handleChange}
            />
            <button type='submit' onClick={handleSearch}><BiSearchAlt2 size={15} color='#FFF' /></button>
        </div>

        {tempo ? (
    <>
        <div className="sessao-1">
            <div className="principal">
                <div className="esquerda">
                    <div className="conteudo-esquerdo">
                        <h4>Tempo Atual</h4>
                        <h2>{cidadePesquisada}</h2>
                        <div className="temp">
                            <img src={tempo.current.condition.icon} alt="icone" />
                            <h1>{tempo.current.temp_c.toFixed(0)}º</h1>
                        </div>
                        <p>{tempo.current.condition.text}</p>
                    </div>
                </div>

                <div className="direita">
                    <div className="conteudo-direita">
                        <h4>Sensação térmica {tempo.current.feelslike_c.toFixed(0)}º</h4>

                        <div className="max-min">
                           {tempo.forecast.forecastday.map(day => {
                                return(
                                    <>
                                        <ImArrowUp color='#153c5e' />
                                        <h4 className='ma-mi'>{day.day.maxtemp_c.toFixed(0)}º</h4>

                                        <ImArrowDown color='#153c5e' />
                                        <h4 className='ma-mi'>{day.day.mintemp_c.toFixed(0)}º</h4>
                                    </>
                                )
                           })} 
                        </div>

                        <div className="caracteristicas">
                            <div className="umidade">
                                <GiWaterDrop color='#153c5e' />
                                <p>Umidade</p>
                                <p><span className='afastar-1'>{tempo.current.humidity} %</span></p>
                            </div>

                            <div className="vento">
                            <RiCloudWindyFill color='#153c5e' />
                            <p>Vento</p>
                            <p><span className='afastar-2'>{tempo.current.wind_kph.toFixed(0)} Km/h</span></p>
                            </div>

                            <div className="pressao">
                                <AiFillCompass color='#153c5e' />
                                <p>Pressão</p>
                                <p><span className='afastar-3'>{tempo.current.pressure_mb} hpa</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="sessao-2">
            <div className="secundario">

                <div className="secundario-esquerda">
                    {tempo.forecast.forecastday.map(day => {
                        return(
                            <>
                                <BsFillSunFill size={60} color='#4a6fa1' />
                                <h3 className='nascer-sol'>O sol nasce às <span>{day.astro.sunrise}</span></h3>
                                <h3>O sol se põe às <span>{day.astro.sunset}</span></h3>
                            </>
                        )
                    })}

                </div>

                <div className="secundario-direita">

                {tempo.forecast.forecastday.map(day => {
                        return(
                            <>
                                <BsMoonStarsFill size={60} color='#4a6fa1' />
                                <h3 className='nascer-lua'>A lua nasce às <span>{day.astro.moonrise}</span></h3>
                                <h3>A lua se põe às <span>{day.astro.moonset}</span></h3>
                            </>
                        )
                    })}

                </div>

            </div>
        </div>
    </>
        ) : 
        
        <div className="falso">
            <div className="sessao-1-falso">
                <div className="principal-falso">
                    <h1>Desenvolvido por Mateus Pessoa</h1>
                    <div className="social">
                        <div className="social-1">
                            <a href="https://github.com/mateuspessoa" target='_blank'>
                                <AiFillGithub size={40} color='#7b98b2' />
                            </a>
                        </div>

                        <div className="social-2">
                            <a href="https://www.linkedin.com/in/mateus-pessoa-17635a22a/" target='_blank'>
                                <AiFillLinkedin size={40} color='#7b98b2' />
                            </a>
                        </div>
                    </div>
                    <div className="conteudo-falso">
                        <h3>Este projeto consome os dados da Weather API e foi desenvolvido utilizando o React JS. O objetivo desse projeto é exibir os dados meteorológicos atuais da cidade que for pesquisada pelo usuário.</h3>
                    </div>

                    <div className="final">
                        <h4>Pesquise por uma cidade para iniciar!</h4>
                    </div>
                </div>
            </div>
        </div>
        
        }

    </div>
  )
}

export default Home