import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfanityFilterService {

  cleanText(toClean:string | null | undefined){

    let cleanedText:string | null | undefined = toClean;

    if(cleanedText){

        const re = /arse|arsehead|arsehole|ass|asshole|bastard|bitch|bloody|bollocks|bugger|biscuit|bullshit|boobs|cock|cunt|chink|coon|damn|dick|dyke|fucker|frigger|fuck|fluff|fag|goddamn|godsdamn|holy shit|horseshit|kike|motherfucker|motherfucking|nigga|nigra|nigger|piss|prick|pussy|penis|shit|shite|slut|son of a bitch|son of a whore|twat|vagina|wanker/gi; //NOSONAR
        cleanedText = cleanedText.replace(re,'***');
    }

    return cleanedText;

  }

  isDirty(toClean:string | null | undefined){

    let dirtyCheck = false;

    const theText:string | null | undefined = toClean;
    const theTextAfter: string | null | undefined = this.cleanText(theText);

    if(theText === theTextAfter){
      return dirtyCheck;
    }

    dirtyCheck = true;

    return dirtyCheck;

  }

}
