/* global echarts */

var theme = {
    color: [
        '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
        '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
    ],
    title: {
        itemGap: 8,
        textStyle: {
            fontWeight: 'normal',
            color: '#408829'
        }
    },
    dataRange: {
        color: ['#1f610a', '#97b58d']
    },
    toolbox: {
        color: ['#408829', '#408829', '#408829', '#408829']
    },
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#408829',
                type: 'dashed'
            },
            crossStyle: {
                color: '#408829'
            },
            shadowStyle: {
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },
    dataZoom: {
        dataBackgroundColor: '#eee',
        fillerColor: 'rgba(64,136,41,0.2)',
        handleColor: '#408829'
    },
    grid: {
        borderWidth: 0
    },
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#408829'
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },
    valueAxis: {
        axisLine: {
            lineStyle: {
                color: '#408829'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },
    timeline: {
        lineStyle: {
            color: '#408829'
        },
        controlStyle: {
            normal: {color: '#408829'},
            emphasis: {color: '#408829'}
        }
    },
    k: {
        itemStyle: {
            normal: {
                color: '#68a54a',
                color0: '#a9cba2',
                lineStyle: {
                    width: 1,
                    color: '#408829',
                    color0: '#86b379'
                }
            }
        }
    },
    map: {
        itemStyle: {
            normal: {
                areaStyle: {
                    color: '#ddd'
                },
                label: {
                    textStyle: {
                        color: '#c12e34'
                    }
                }
            },
            emphasis: {
                areaStyle: {
                    color: '#99d2dd'
                },
                label: {
                    textStyle: {
                        color: '#c12e34'
                    }
                }
            }
        }
    },
    force: {
        itemStyle: {
            normal: {
                linkStyle: {
                    strokeColor: '#408829'
                }
            }
        }
    },
    chord: {
        padding: 4,
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },
    gauge: {
        startAngle: 225,
        endAngle: -45,
        axisLine: {
            show: true,
            lineStyle: {
                color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
                width: 8
            }
        },
        axisTick: {
            splitNumber: 10,
            length: 12,
            lineStyle: {
                color: 'auto'
            }
        },
        axisLabel: {
            textStyle: {
                color: 'auto'
            }
        },
        splitLine: {
            length: 18,
            lineStyle: {
                color: 'auto'
            }
        },
        pointer: {
            length: '90%',
            color: 'auto'
        },
        title: {
            textStyle: {
                color: '#333'
            }
        },
        detail: {
            textStyle: {
                color: 'auto'
            }
        }
    },
    textStyle: {
        fontFamily: 'Arial, Verdana, sans-serif'
    }
};

function trafficeByCountry(counttry) {

    var echartMap = echarts.init(document.getElementById('echart_world_map'), theme);

    echartMap.setOption({
        title: {
            text: '',
            subtext: '',
            x: 'center',
            y: 'top'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + '.' + value[1];
                return params.seriesName + '<br/>' + params.name + ' : ' + value;
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    title: "Text View",
                    lang: [
                        "Text View",
                        "Close",
                        "Refresh"
                    ],
                    readOnly: false
                },
                restore: {
                    show: true,
                    title: "Restore"
                },
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        dataRange: {
            min: 0,
            max: 1000000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['#087E65', '#26B99A', '#CBEAE3']
        },
        series: [{
                name: 'Site Trafice',
                type: 'map',
                mapType: 'world',
                roam: false,
                mapLocation: {
                    y: 60
                },
                itemStyle: {
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data: count(counttry)
            }]
    });
}


function trafficeByCountryForClick(city) {

    var echartMap = echarts.init(document.getElementById('echart_world_map_click'), theme);

    echartMap.setOption({
        title: {
            text: '',
            subtext: '',
            x: 'center',
            y: 'top'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + '.' + value[1];
                return params.seriesName + '<br/>' + params.name + ' : ' + value;
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    title: "Text View",
                    lang: [
                        "Text View",
                        "Close",
                        "Refresh"
                    ],
                    readOnly: false
                },
                restore: {
                    show: true,
                    title: "Restore"
                },
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        dataRange: {
            min: 0,
            max: 1000000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['#087E65', '#26B99A', '#CBEAE3']
        },
        series: [{
                name: '',
                type: 'map',
                mapType: 'world',
                roam: false,
                mapLocation: {
                    y: 60
                },
                itemStyle: {
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data: count(city)
            }]
    });
}

function count(array_elements) {

    var tmp = [];
    array_elements.sort();
    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] !== current) {
            if (cnt > 0) {
                //console.log(current + ' comes --> ' + cnt + ' times<br>');
                tmp.push({name: getFullName(current), value: cnt});

            }
            current = array_elements[i];
            cnt = 1;

            if (array_elements.length === i + 1) {
                tmp.push({name: getFullName(current), value: cnt});
            }
        } else {
            cnt++;
        }
    }

    return tmp;
}

function getFullName(c) {
    var allCountry = [
        {
            "name": "Afghanistan",
            "code": "AF"
        },
        {
            "name": "Åland Islands",
            "code": "AX"
        },
        {
            "name": "Albania",
            "code": "AL"
        },
        {
            "name": "Algeria",
            "code": "DZ"
        },
        {
            "name": "American Samoa",
            "code": "AS"
        },
        {
            "name": "AndorrA",
            "code": "AD"
        },
        {
            "name": "Angola",
            "code": "AO"
        },
        {
            "name": "Anguilla",
            "code": "AI"
        },
        {
            "name": "Antarctica",
            "code": "AQ"
        },
        {
            "name": "Antigua and Barbuda",
            "code": "AG"
        },
        {
            "name": "Argentina",
            "code": "AR"
        },
        {
            "name": "Armenia",
            "code": "AM"
        },
        {
            "name": "Aruba",
            "code": "AW"
        },
        {
            "name": "Australia",
            "code": "AU"
        },
        {
            "name": "Austria",
            "code": "AT"
        },
        {
            "name": "Azerbaijan",
            "code": "AZ"
        },
        {
            "name": "Bahamas",
            "code": "BS"
        },
        {
            "name": "Bahrain",
            "code": "BH"
        },
        {
            "name": "Bangladesh",
            "code": "BD"
        },
        {
            "name": "Barbados",
            "code": "BB"
        },
        {
            "name": "Belarus",
            "code": "BY"
        },
        {
            "name": "Belgium",
            "code": "BE"
        },
        {
            "name": "Belize",
            "code": "BZ"
        },
        {
            "name": "Benin",
            "code": "BJ"
        },
        {
            "name": "Bermuda",
            "code": "BM"
        },
        {
            "name": "Bhutan",
            "code": "BT"
        },
        {
            "name": "Bolivia",
            "code": "BO"
        },
        {
            "name": "Bosnia and Herzegovina",
            "code": "BA"
        },
        {
            "name": "Botswana",
            "code": "BW"
        },
        {
            "name": "Bouvet Island",
            "code": "BV"
        },
        {
            "name": "Brazil",
            "code": "BR"
        },
        {
            "name": "British Indian Ocean Territory",
            "code": "IO"
        },
        {
            "name": "Brunei Darussalam",
            "code": "BN"
        },
        {
            "name": "Bulgaria",
            "code": "BG"
        },
        {
            "name": "Burkina Faso",
            "code": "BF"
        },
        {
            "name": "Burundi",
            "code": "BI"
        },
        {
            "name": "Cambodia",
            "code": "KH"
        },
        {
            "name": "Cameroon",
            "code": "CM"
        },
        {
            "name": "Canada",
            "code": "CA"
        },
        {
            "name": "Cape Verde",
            "code": "CV"
        },
        {
            "name": "Cayman Islands",
            "code": "KY"
        },
        {
            "name": "Central African Republic",
            "code": "CF"
        },
        {
            "name": "Chad",
            "code": "TD"
        },
        {
            "name": "Chile",
            "code": "CL"
        },
        {
            "name": "China",
            "code": "CN"
        },
        {
            "name": "Christmas Island",
            "code": "CX"
        },
        {
            "name": "Cocos (Keeling) Islands",
            "code": "CC"
        },
        {
            "name": "Colombia",
            "code": "CO"
        },
        {
            "name": "Comoros",
            "code": "KM"
        },
        {
            "name": "Congo",
            "code": "CG"
        },
        {
            "name": "Congo, The Democratic Republic of the",
            "code": "CD"
        },
        {
            "name": "Cook Islands",
            "code": "CK"
        },
        {
            "name": "Costa Rica",
            "code": "CR"
        },
        {
            "name": "Cote D\"Ivoire",
            "code": "CI"
        },
        {
            "name": "Croatia",
            "code": "HR"
        },
        {
            "name": "Cuba",
            "code": "CU"
        },
        {
            "name": "Cyprus",
            "code": "CY"
        },
        {
            "name": "Czech Republic",
            "code": "CZ"
        },
        {
            "name": "Denmark",
            "code": "DK"
        },
        {
            "name": "Djibouti",
            "code": "DJ"
        },
        {
            "name": "Dominica",
            "code": "DM"
        },
        {
            "name": "Dominican Republic",
            "code": "DO"
        },
        {
            "name": "Ecuador",
            "code": "EC"
        },
        {
            "name": "Egypt",
            "code": "EG"
        },
        {
            "name": "El Salvador",
            "code": "SV"
        },
        {
            "name": "Equatorial Guinea",
            "code": "GQ"
        },
        {
            "name": "Eritrea",
            "code": "ER"
        },
        {
            "name": "Estonia",
            "code": "EE"
        },
        {
            "name": "Ethiopia",
            "code": "ET"
        },
        {
            "name": "Falkland Islands (Malvinas)",
            "code": "FK"
        },
        {
            "name": "Faroe Islands",
            "code": "FO"
        },
        {
            "name": "Fiji",
            "code": "FJ"
        },
        {
            "name": "Finland",
            "code": "FI"
        },
        {
            "name": "France",
            "code": "FR"
        },
        {
            "name": "French Guiana",
            "code": "GF"
        },
        {
            "name": "French Polynesia",
            "code": "PF"
        },
        {
            "name": "French Southern Territories",
            "code": "TF"
        },
        {
            "name": "Gabon",
            "code": "GA"
        },
        {
            "name": "Gambia",
            "code": "GM"
        },
        {
            "name": "Georgia",
            "code": "GE"
        },
        {
            "name": "Germany",
            "code": "DE"
        },
        {
            "name": "Ghana",
            "code": "GH"
        },
        {
            "name": "Gibraltar",
            "code": "GI"
        },
        {
            "name": "Greece",
            "code": "GR"
        },
        {
            "name": "Greenland",
            "code": "GL"
        },
        {
            "name": "Grenada",
            "code": "GD"
        },
        {
            "name": "Guadeloupe",
            "code": "GP"
        },
        {
            "name": "Guam",
            "code": "GU"
        },
        {
            "name": "Guatemala",
            "code": "GT"
        },
        {
            "name": "Guernsey",
            "code": "GG"
        },
        {
            "name": "Guinea",
            "code": "GN"
        },
        {
            "name": "Guinea-Bissau",
            "code": "GW"
        },
        {
            "name": "Guyana",
            "code": "GY"
        },
        {
            "name": "Haiti",
            "code": "HT"
        },
        {
            "name": "Heard Island and Mcdonald Islands",
            "code": "HM"
        },
        {
            "name": "Holy See (Vatican City State)",
            "code": "VA"
        },
        {
            "name": "Honduras",
            "code": "HN"
        },
        {
            "name": "Hong Kong",
            "code": "HK"
        },
        {
            "name": "Hungary",
            "code": "HU"
        },
        {
            "name": "Iceland",
            "code": "IS"
        },
        {
            "name": "India",
            "code": "IN"
        },
        {
            "name": "Indonesia",
            "code": "ID"
        },
        {
            "name": "Iran, Islamic Republic Of",
            "code": "IR"
        },
        {
            "name": "Iraq",
            "code": "IQ"
        },
        {
            "name": "Ireland",
            "code": "IE"
        },
        {
            "name": "Isle of Man",
            "code": "IM"
        },
        {
            "name": "Israel",
            "code": "IL"
        },
        {
            "name": "Italy",
            "code": "IT"
        },
        {
            "name": "Jamaica",
            "code": "JM"
        },
        {
            "name": "Japan",
            "code": "JP"
        },
        {
            "name": "Jersey",
            "code": "JE"
        },
        {
            "name": "Jordan",
            "code": "JO"
        },
        {
            "name": "Kazakhstan",
            "code": "KZ"
        },
        {
            "name": "Kenya",
            "code": "KE"
        },
        {
            "name": "Kiribati",
            "code": "KI"
        },
        {
            "name": "Korea, Democratic People\"S Republic of",
            "code": "KP"
        },
        {
            "name": "Korea, Republic of",
            "code": "KR"
        },
        {
            "name": "Kuwait",
            "code": "KW"
        },
        {
            "name": "Kyrgyzstan",
            "code": "KG"
        },
        {
            "name": "Lao People\"S Democratic Republic",
            "code": "LA"
        },
        {
            "name": "Latvia",
            "code": "LV"
        },
        {
            "name": "Lebanon",
            "code": "LB"
        },
        {
            "name": "Lesotho",
            "code": "LS"
        },
        {
            "name": "Liberia",
            "code": "LR"
        },
        {
            "name": "Libyan Arab Jamahiriya",
            "code": "LY"
        },
        {
            "name": "Liechtenstein",
            "code": "LI"
        },
        {
            "name": "Lithuania",
            "code": "LT"
        },
        {
            "name": "Luxembourg",
            "code": "LU"
        },
        {
            "name": "Macao",
            "code": "MO"
        },
        {
            "name": "Macedonia, The Former Yugoslav Republic of",
            "code": "MK"
        },
        {
            "name": "Madagascar",
            "code": "MG"
        },
        {
            "name": "Malawi",
            "code": "MW"
        },
        {
            "name": "Malaysia",
            "code": "MY"
        },
        {
            "name": "Maldives",
            "code": "MV"
        },
        {
            "name": "Mali",
            "code": "ML"
        },
        {
            "name": "Malta",
            "code": "MT"
        },
        {
            "name": "Marshall Islands",
            "code": "MH"
        },
        {
            "name": "Martinique",
            "code": "MQ"
        },
        {
            "name": "Mauritania",
            "code": "MR"
        },
        {
            "name": "Mauritius",
            "code": "MU"
        },
        {
            "name": "Montenegro",
            "code": "YT"
        },
        {
            "name": "Mexico",
            "code": "MX"
        },
        {
            "name": "Micronesia, Federated States of",
            "code": "FM"
        },
        {
            "name": "Moldova, Republic of",
            "code": "MD"
        },
        {
            "name": "Monaco",
            "code": "MC"
        },
        {
            "name": "Mongolia",
            "code": "MN"
        },
        {
            "name": "Montserrat",
            "code": "MS"
        },
        {
            "name": "Morocco",
            "code": "MA"
        },
        {
            "name": "Mozambique",
            "code": "MZ"
        },
        {
            "name": "Myanmar",
            "code": "MM"
        },
        {
            "name": "Namibia",
            "code": "NA"
        },
        {
            "name": "Nauru",
            "code": "NR"
        },
        {
            "name": "Nepal",
            "code": "NP"
        },
        {
            "name": "Netherlands",
            "code": "NL"
        },
        {
            "name": "Netherlands Antilles",
            "code": "AN"
        },
        {
            "name": "New Caledonia",
            "code": "NC"
        },
        {
            "name": "New Zealand",
            "code": "NZ"
        },
        {
            "name": "Nicaragua",
            "code": "NI"
        },
        {
            "name": "Niger",
            "code": "NE"
        },
        {
            "name": "Nigeria",
            "code": "NG"
        },
        {
            "name": "Niue",
            "code": "NU"
        },
        {
            "name": "Norfolk Island",
            "code": "NF"
        },
        {
            "name": "Northern Mariana Islands",
            "code": "MP"
        },
        {
            "name": "Norway",
            "code": "NO"
        },
        {
            "name": "Oman",
            "code": "OM"
        },
        {
            "name": "Pakistan",
            "code": "PK"
        },
        {
            "name": "Palau",
            "code": "PW"
        },
        {
            "name": "Palestinian Territory, Occupied",
            "code": "PS"
        },
        {
            "name": "Panama",
            "code": "PA"
        },
        {
            "name": "Papua New Guinea",
            "code": "PG"
        },
        {
            "name": "Paraguay",
            "code": "PY"
        },
        {
            "name": "Peru",
            "code": "PE"
        },
        {
            "name": "Philippines",
            "code": "PH"
        },
        {
            "name": "Pitcairn",
            "code": "PN"
        },
        {
            "name": "Poland",
            "code": "PL"
        },
        {
            "name": "Portugal",
            "code": "PT"
        },
        {
            "name": "Puerto Rico",
            "code": "PR"
        },
        {
            "name": "Qatar",
            "code": "QA"
        },
        {
            "name": "Reunion",
            "code": "RE"
        },
        {
            "name": "Romania",
            "code": "RO"
        },
        {
            "name": "Russian Federation",
            "code": "RU"
        },
        {
            "name": "RWANDA",
            "code": "RW"
        },
        {
            "name": "Saint Helena",
            "code": "SH"
        },
        {
            "name": "Saint Kitts and Nevis",
            "code": "KN"
        },
        {
            "name": "Saint Lucia",
            "code": "LC"
        },
        {
            "name": "Saint Pierre and Miquelon",
            "code": "PM"
        },
        {
            "name": "Saint Vincent and the Grenadines",
            "code": "VC"
        },
        {
            "name": "Samoa",
            "code": "WS"
        },
        {
            "name": "San Marino",
            "code": "SM"
        },
        {
            "name": "Sao Tome and Principe",
            "code": "ST"
        },
        {
            "name": "Saudi Arabia",
            "code": "SA"
        },
        {
            "name": "Senegal",
            "code": "SN"
        },
        {
            "name": "Serbia and Montenegro",
            "code": "CS"
        },
        {
            "name": "Seychelles",
            "code": "SC"
        },
        {
            "name": "Sierra Leone",
            "code": "SL"
        },
        {
            "name": "Singapore",
            "code": "SG"
        },
        {
            "name": "Slovakia",
            "code": "SK"
        },
        {
            "name": "Slovenia",
            "code": "SI"
        },
        {
            "name": "Solomon Islands",
            "code": "SB"
        },
        {
            "name": "Somalia",
            "code": "SO"
        },
        {
            "name": "South Africa",
            "code": "ZA"
        },
        {
            "name": "South Georgia and the South Sandwich Islands",
            "code": "GS"
        },
        {
            "name": "Spain",
            "code": "ES"
        },
        {
            "name": "Sri Lanka",
            "code": "LK"
        },
        {
            "name": "Sudan",
            "code": "SD"
        },
        {
            "name": "Suriname",
            "code": "SR"
        },
        {
            "name": "Svalbard and Jan Mayen",
            "code": "SJ"
        },
        {
            "name": "Swaziland",
            "code": "SZ"
        },
        {
            "name": "Sweden",
            "code": "SE"
        },
        {
            "name": "Switzerland",
            "code": "CH"
        },
        {
            "name": "Syrian Arab Republic",
            "code": "SY"
        },
        {
            "name": "Taiwan",
            "code": "TW"
        },
        {
            "name": "Tajikistan",
            "code": "TJ"
        },
        {
            "name": "Tanzania",
            "code": "TZ"
        },
        {
            "name": "Thailand",
            "code": "TH"
        },
        {
            "name": "Timor-Leste",
            "code": "TL"
        },
        {
            "name": "Togo",
            "code": "TG"
        },
        {
            "name": "Tokelau",
            "code": "TK"
        },
        {
            "name": "Tonga",
            "code": "TO"
        },
        {
            "name": "Trinidad and Tobago",
            "code": "TT"
        },
        {
            "name": "Tunisia",
            "code": "TN"
        },
        {
            "name": "Turkey",
            "code": "TR"
        },
        {
            "name": "Turkmenistan",
            "code": "TM"
        },
        {
            "name": "Turks and Caicos Islands",
            "code": "TC"
        },
        {
            "name": "Tuvalu",
            "code": "TV"
        },
        {
            "name": "Uganda",
            "code": "UG"
        },
        {
            "name": "Ukraine",
            "code": "UA"
        },
        {
            "name": "United Arab Emirates",
            "code": "AE"
        },
        {
            "name": "United Kingdom",
            "code": "GB"
        },
        {
            "name": "United States of America",
            "code": "US"
        },
        {
            "name": "United States Minor Outlying Islands",
            "code": "UM"
        },
        {
            "name": "Uruguay",
            "code": "UY"
        },
        {
            "name": "Uzbekistan",
            "code": "UZ"
        },
        {
            "name": "Vanuatu",
            "code": "VU"
        },
        {
            "name": "Venezuela",
            "code": "VE"
        },
        {
            "name": "Viet Nam",
            "code": "VN"
        },
        {
            "name": "Virgin Islands, British",
            "code": "VG"
        },
        {
            "name": "Virgin Islands, U.S.",
            "code": "VI"
        },
        {
            "name": "Wallis and Futuna",
            "code": "WF"
        },
        {
            "name": "Western Sahara",
            "code": "EH"
        },
        {
            "name": "Yemen",
            "code": "YE"
        },
        {
            "name": "Zambia",
            "code": "ZM"
        },
        {
            "name": "Zimbabwe",
            "code": "ZW"
        }
    ];
    var name = "";
    for (var i = 0; i < allCountry.length; i++) {
        if (c === allCountry[i].code) {
            name = allCountry[i].name;
            break;
        }
    }
    return name;
}
