
'use strict';

import { ComposeVersionKeys, KeyInfo } from "../discoExtension";


const DISCO_SPECS_V2000_2_KEY_INFO: KeyInfo = {
    /* 
     * Disco2000 language reserved keywords
     * http://www.sis.uta.fi/~tn69504/ifs/disco_for_linux/disco_bk.pdf    
     *   
     */
    'layer': (
        "Basic element for modularization. Can contain other layers, types, classes, etc."
     ),
    'class': (
        "Main object of modelling"
    ),
    'function': (
        "function as an abbreviation of expressions"
     ),
    'action': (
        "Attributes of actionable item in class instances"
    ),
    'is': (
        "Star of definition"
    ),
    'end': (
        "end block for any tipe definition, predicate or statement"
    ),
    'when': (
        "guard predicate"
    ),
    'type': (
        "type structure definition"
    ),
    'abs': (
        "Absolute value. ex abs(3)"
    ),
    'and': (
        "Boolean operator and. ex 1 and 0"
    ),
    'as': (
        "as"
    ),
    'assert': (
        "assert"
    ),
    'by': (
        "by"
    ),
    'closure': (
        "closure"
    ),
    'concatenate': (
        "Concatenate"
    ),
    'constant': (
        "constant definition. Ex constant PI: real :=3.14;"
    ),
    'delete': (
        "delete"
    ),
    'import': (
        "import statement to include a specification in current layer. Ex import a_layer;"
    ),
    'distinct': (
        "distinct"
    ),
    'do': (
        "do"
    ),
    'dynamic': (
        "dynamic"
    ),
    'if': (
        "if is the conditional statement start"
    ),
    'else': (
        "else"
    ),
    'elsif': (
        "elsif"
    ),
    'exclude': (
        "exclude classes and types that belong to a minimal set"
    ),
    'exists': (
        "test for exists any"
    ),
    'exists1': (
        "exists at least 1"
    ),
    'extend': (
        "extend"
    ),
    'for': (
        "for"
    ),
    'forall': (
        "forall iterates over all instances of certain type or class"
    ),
    'frozen': (
        "frozen declaration for sealed classes"
    ),    
    'in': (
        "in"
    ),
    'include': (
        "include types, classes and actions that are compatible but not belongs to a set"
    ),
    'initially': (
        "initially"
    ),
    'join': (
        "join is similar to concatenate"
    ),
    'max': (
        "max"
    ),
    'min': (
        "min"
    ),
    'mod': (
        "mod is modulus operator"
    ),
    'new': (
        "new"
    ),
    'not': (
        "not is negation operator"
    ),
    'obligation': (
        "obligation"
    ),
    'or': (
        "or"
    ),
    'of': (
        "of"
    ),
    'reference': (
        "reference"
    ),
    'refined': (
        "refined specification"
    ),
    'relation': (
        "relation"
    ),
    'rename': (
        "rename is used to maintain uniqueness of names. Ex renamed_data = rename prev_name_data;"
    ),
    'replace': (
        "replace"
    ),
    'return': (
        "return marks the end of a function declaration"
    ),
    'sequence': (
        "sequence"
    ),
    'set': (
        "set"
    ),
    'shadow': (
        "shadow"
    ),
    'specialized': (
        "specialized"
    ),
    'then': (
        "then"
    ),
    'with': (
        "with"
    )
};

export default <ComposeVersionKeys> {
    v2000: DISCO_SPECS_V2000_2_KEY_INFO,
    All: DISCO_SPECS_V2000_2_KEY_INFO
}