const stulle = {

    'styles' : {

        '1' :  {order: ['foundation', 'main'],                                                          poetic_title: {pos: 1, text: 'Arme'}},
        '2' :  {order: ['foundation', 'primer', 'main', 'topping'],                                     poetic_title: {pos: 1, text: 'Gemeine'}},
        '3' :  {order: ['foundation', 'primer', 'main', 'topping', 'main', 'topping'],                  poetic_title: {pos: 1, text: 'Adlig'}},
        '4' :  {order: ['foundation', 'primer', 'main', 'topping', 'main', 'topping', 'foundation'],    poetic_title: {pos: 1, text: 'Pfundig'}}
    },

    'ingredients' : {

        'foundation' : {
        
                '1': {slug: 'schwarzbrot', 	style: 'brown',                                                     poetic_title: {pos: 2, text: 'Ordinäre'}},
                '2': {slug: 'koernerbrot', 	style: 'pattern-brown',                                             poetic_title: {pos: 2, text: 'Körnige'}},
                '3': {slug: 'weissbrot', 	style: 'white-bread',                                               poetic_title: {pos: 2, text: 'Helle'}},
                '4': {slug: 'pumpernickel', 	style: 'white-bread',                                               poetic_title: {pos: 2, text: 'Volle'}},
                '5': {slug: 'knaeckebrot', 	style: 'white-bread',                                               poetic_title: {pos: 2, text: 'Knackige'}},
                '6': {slug: 'buchweizenchia', 	style: 'white-bread',                                               poetic_title: {pos: 2, text: 'Hippe'}},
                '7': {slug: 'dinkel', 	        style: 'white-bread',                                               poetic_title: {pos: 2, text: 'Junge'}}
            
        },

        'primer' : {

                '1': {slug: 'butter', 		style: 'butter',                                                    poetic_title: {pos: 3, text: 'Traum'}},
                '2': {slug: 'frischkaese', 	style: 'cream-cheese',                                              poetic_title: {pos: 3, text: 'Berg'}},
                '3': {slug: 'guacamole', 	style: 'guacamole',                                                 poetic_title: {pos: 3, text: 'Exoten'}}
            
        },
        
        'main' : {

                '1': {slug: 'kaese', 		style: 'cheese',                                                    poetic_title: {pos: 4, text: 'Milch'}},
                '2': {slug: 'salami', 	        style: 'salami',                                                    poetic_title: {pos: 4, text: 'Dirne'}},
                '3': {slug: 'schinken', 	style: 'ham',                                                       poetic_title: {pos: 4, text: 'Knolle'}}
            
        },
        
        'topping' : {
        
                '1': {slug: 'ketchup', 		style: 'red',                                                       poetic_title: {pos: 5, text: 'in rot'}},
                '2': {slug: 'mayonaise', 	style: 'dirty-white',                                               poetic_title: {pos: 5, text: 'am Ei'}},
                '3': {slug: 'senf', 		style: 'yellow',                                                    poetic_title: {pos: 5, text: 'mit Pfiff'}}
            
        }

    }

};