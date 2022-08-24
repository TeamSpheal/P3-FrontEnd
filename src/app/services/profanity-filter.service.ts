import { Injectable } from '@angular/core';

type cleanTextType = string | null | undefined;

@Injectable({
  providedIn: 'root'
})
export class ProfanityFilterService {


  cleanText(toClean: cleanTextType){

    let cleanedText: cleanTextType = toClean;

    if(cleanedText){

        const re = /arse|arsehead|arsehole|ass|asshole|bastard|bitch|bloody|bollocks|bugger|biscuit|bullshit|boobs|cock|cunt|chink|coon|damn|dick|dyke|fucker|frigger|fuck|fluff|fag|goddamn|godsdamn|holy shit|horseshit|kike|motherfucker|motherfucking|nigga|nigra|nigger|piss|prick|pussy|penis|shit|shite|slut|son of a bitch|son of a whore|twat|vagina|wanker/gi; //NOSONAR
        cleanedText = cleanedText.replace(re,'***');
    }

    return cleanedText;

  }

  isDirty(toClean: cleanTextType){

    let dirtyCheck = false;

    const theText: cleanTextType = toClean;
    const theTextAfter: cleanTextType = this.cleanText(theText);

    if(theText === theTextAfter){
      return dirtyCheck;
    }

    dirtyCheck = true;

    return dirtyCheck;

  }

}
