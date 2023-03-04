import React, { useState } from "react"
import { Settings } from "../lib/types.index";


export const SettingsContext = React.createContext<{ settings: any; saveSettings:(config:any)=>void }>({
  settings: {},
  saveSettings:(config:any)=>{},
});

const initialSettings: Settings = {
  skin: 'default',
  themeColor: "primary",
  // ** Layout Configs
  mode: "light" /* light | dark */,
  contentWidth: "boxed" /* full | boxed */,
  direction: 'ltr',
  // ** Navigation (Menu) Configs
  menuTextTruncate: true /* true | false */,
  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */,
};


export const SettingsProvider:React.FC<any> = (props)=>{
      const [settings, setSettings] = useState<any>({
        ...initialSettings,
      });

    function saveSettings(config:any){
      console.log(config)
      setSettings((prevState:any)=>({...prevState,...config}))
    }
    return (
      <SettingsContext.Provider value={{ settings, saveSettings }}>
        {props.children}
      </SettingsContext.Provider>
    );
}

export const SettingsConsumer = SettingsContext.Consumer