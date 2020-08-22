
//https://convertacolor.com/

const common = {
    
    color_active: '#00A6E6'
    ,color_neutral: '#888888'
    
    ,color_error: '#c86765'
    ,COLOR_error: '#fac7c6'
    
    ,color_success: '#37A569'
    ,COLOR_success: '#dbf2d6'
    
    ,color_warning: '#C98600'
    ,COLOR_warning: '#ffedbe'
    
    ,color_tip: '#2688b2'
    ,COLOR_tip: '#caebfb'
    
    
    ,color_save: '#bbffbb'
    ,COLOR_save: '#2ecc71'
    
    ,color_delete: '#ffbbbb'
    ,COLOR_delete: '#d00000'
    
    
    // https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints
    // https://docs.adobe.com/content/help/en/target/using/experiences/vec/mobile-viewports.html
    ,media: {
        
        // 360 ~ ( min-width를 360으로 잡는다)
        
        // mobile(normal): 360~576           default (mobile first)
        // mobile(horizon): 576~768          @media (min-width: 576px)
        
        // tablet(vertical): 768~992         @media (min-width: 768px)
        // tablet(horison) or monitor: 992~  @media (min-width: 992px)
        
        sm: 576
        , md: 768
        , lg: 992
        , xl: 1200 // 참고로만, 아직 이용할 생각 X
        // 360, 740 (768), 1000
        
        ,small_mid: 360 // 
        ,mid_big: 800 // 400 * 2
        
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
        
        
        ,COLOR_normal: 'hsl(240, 5%, 8%)'   // 5% 씩
        ,COLOR_middle: 'hsl(240, 5%, 4%)'
        ,COLOR_bg: 'hsl(240, 5%, 0%)'
        
    
    }
    
}

export default themes