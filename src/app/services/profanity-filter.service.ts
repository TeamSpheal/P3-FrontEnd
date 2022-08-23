import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfanityFilterService {

  constructor() { }

  cleanText(toClean:string | null | undefined){

    let cleanedText:string | null | undefined = toClean;

    if(cleanedText){
        let re = /arse|arsehead|arsehole|ass|asshole|bastard|bitch|bloody|bollocks|bugger|biscuit|bullshit|boobs|cock|cunt|chink|coon|damn|dick|dyke|fucker|frigger|fuck|fluff|fag|goddamn|godsdamn|holy shit|horseshit|kike|motherfucker|motherfucking|nigga|nigra|nigger|piss|prick|pussy|penis|shit|shite|slut|son of a bitch|son of a whore|twat|vagina|wanker/gi;
        cleanedText = cleanedText.replace(re,'***');
    }

    return cleanedText;

}

}
