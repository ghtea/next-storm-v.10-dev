
//https://convertacolor.com/

const common = {
    
    color_active: '#00A6E6'
    ,color_neutral: '#888888'
    
    ,color_error: '#c86765'
    ,COLOR_error: '#fac7c6'
    
    ,color_success: '#37A569'
    ,COLOR_success: '#dbf2d6'
    
    ,color_warning: '#eabe5c'
    ,COLOR_warning: '#ffedbe'
    
    ,color_tip: '#2688b2'
    ,COLOR_tip: '#caebfb'
    
    
    ,color_save: '#bbffbb'
    ,COLOR_save: '#2ecc71'
    
    ,color_delete: '#ffbbbb'
    ,COLOR_delete: '#d00000'
    
    
    
    ,media: {
        
        small_mid: 420 // 
        ,mid_big: 920 // 120 + 400 * 2
        
        /*
        ,comp_gallery :{
            mid_big: 870 // 860 = 120 + 370 * 2
        }
        */
    }
    
}


// white to black https://www.colorhexa.com/ffffff
const themes =  {

    light: {
    
        ...common
        
        ,name: "light"
        
        ,color_strong: 'hsl(240, 2%, 0%)'   
        ,color_normal: 'hsl(240, 2%, 18%)'   // 18% down
        ,color_weak: 'hsl(240, 2%, 50%)'       // 32% down
        ,color_very_weak: 'hsl(240, 2%, 80%)'   // 30% down
        
        ,COLOR_normal: 'hsl(240, 20%, 100%)'  // 3% 씩
        ,COLOR_middle: 'hsl(240, 20%, 97%)'
        ,COLOR_bg: 'hsl(240, 20%, 94%)'
        
        
    },

    dark: {
    
        ...common
        
        ,name: "dark"
        
        ,color_strong: 'hsl(240, 5%, 100%)'   
        ,color_normal: 'hsl(240, 5%, 82%)'         // 18% down
        ,color_weak: 'hsl(240, 5%, 50%)'           // 32% down
        ,color_very_weak: 'hsl(240, 5%, 20%)'      // 30% down
        
        
        ,COLOR_normal: 'hsl(240, 5%, 10%)'   // 5% 씩
        ,COLOR_middle: 'hsl(240, 5%, 5%)'
        ,COLOR_bg: 'hsl(240, 5%, 0%)'
        
    
    }
    
}

export default themes