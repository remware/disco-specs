
'use strict';

import { ComposeVersionKeys, KeyInfo } from "../discoExtension";


const DISCO_SPECS_V2000_2_KEY_INFO: KeyInfo = {
    // Keywords from specs
    'function': (
        "abbreviation of sequence"
     ),
    'action': (
        "Attributes of actionable item in class instances"
    ),
    'is': (
        "Star of definition"
    ),
    'end': (
        "Closure for definition)"
    ),
    'class': (
        "Main object of modelling"
    ),
    'when': (
        "guard predicate"
    ),
    'type': (
        "CPU quota in number of CPUs"
    )
};

export default <ComposeVersionKeys> {
    v2000: DISCO_SPECS_V2000_2_KEY_INFO,
    All: DISCO_SPECS_V2000_2_KEY_INFO
}