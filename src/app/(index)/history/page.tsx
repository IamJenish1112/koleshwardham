"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types for our historical content
interface HistoricalSection {
  id: string;
  title: string;
  content?: any;
  imageUrl?: string;
}

// Main HistoryPage component
const HistoryPage: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("history1");

  // State for viewport size to help with responsiveness
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if viewport is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Historical data sections
  const historicalSections: HistoricalSection[] = [
    {
      id: "history1",
      title: "સંત શ્રી શિરોમણી કોલવા ભગત નો ટુંક મા ઇતેહાસ",
      content: `<p className="mb-4 text-gray-700 leading-relaxed">
              દ્વારકા નુ જગત મંદિર આથમણા બાર નુ કેમ છે. એનો ઇતીહાસ જન્મભુમી
              કોલેશ્વર ધામ કોલડા ગામના સંત શ્રી શિરોમણી શ્રી કોલવા ભગત કોલડા ગામ
              થી ચાલી ને પગ પાળા દ્વારકાધીશ ના દર્શને ગયા. સંધ્યા ટાણું હતુ અને
              દ્વારકાધીશ ની આરતી પૂર્ણ થતા મંદિર ના દ્વાર બંધ થય ગયા હતા.
              દ્વારકા ના પુંજારી બાપા ને કહયું મારે નિયમ છે શ્રી દ્વારકાધીશ ના
              દર્શન કરીયા પછી હું અન્ન જળ ગ્રહણ કરીશ.
            </p>
            <br>
            <p className="mb-4 text-gray-700 leading-relaxed">
              શ્રી દ્વારકાધીશ નાપરમ ભક્ત શ્રી કોલવા ભગત ને પોતાના હાથ પગ ની જરૂર
              નોહતી અમને તો શ્રી દ્વારકાધીશ ના દર્શન ની જરૂર હતી એટલે સંત શ્રી
              કોલવા ભગતે મંદિર ના પાછળ ભાગ મા બેસી પોતાના હાથ પગ પથ્થર વડે ભાંગી
              નાખીયા મધ્યરાત્રી એ બાવન ગજ ની ધજા ફર ફર ફરવા લાગી અને આકાશ માંથી
              આકાશવાણી નો નાદ થયો હે મારા પ્રિય ભક્ત ઉચું જો તારા માટે મંદિર ના
              દ્વાર ખુલ્લા છે તુ દર્શન કરવા આવ.
            </p>
            <br>
            <p className="text-gray-700 leading-relaxed">
              ત્યારે દ્વારકાધીશ પોતાન પ્રિય ભક્ત નો નાદ સાંભળી પોતાનું ઉગમણા બાર
              નુ જગત મંદિર હતુ તે મંદિર ની દિશા ફેરવી અને આથમણા બારનુ મંદિર કરી
              પ્રિય ભક્ત સંત શ્રી કોલવા ભગત ને શ્રી દ્વારકાધીશ એ દેવળ ફેરવી ને
              દર્શન દીધા. હાલ જગત મંદિર દ્વારકાધીશ નુ આથમણા બાર નુ દેવળ ફેરવેલ
              કોલેશ્વર ધામ કોલડા મા બીરાજમાન.
            </p>`,
      imageUrl: "/api/placeholder/600/400",
    },
    {
      id: "history2",
      title: "કોલવાભગત નુ જીવન ચરિત્ર",
      content: `<p>ચિતલ ગામમાં ગોદડ પરામાં શિવ મંદિર હાલ પણ છે. ત્યા શિવના પુજારી તેવખતના શ્રી રામ ગીરી બાપુ હતા તે શિવની પૂજા કરતા તે પ્રતાપી પુરુષ હતા .તેથી માણસોની અવર-જવર વધારે રહેતી જે કોઈ આશા કરીને આવે તેની મનો કામનાપૂર્ણ થતી.તેજ ગામમાં એટલે કે ચિતલમા બ્રાહ્મણ રહેતા તે પણ શિવ ભક્ત હતા.અને તેનું નામ માધવજીભાઈ હતું તે પરણિત હતા બન્ને શિવ ઉપાશક હતા.અને તેનું નામ માધવજીભાઈ હતું તે પરણિત હતા બન્ને શિવ ઉપાશક હતા.તેમને ત્યાં શિવ કૃપાથી દીકરીનો જન્મ થયો .પણ કઇક કર્મના અંતરાયે લઈને સમય જતા દીકરીની માતા નુ મૃત્યું થયું જયારે માતા મૃત્યું પામ્યા ત્યારે દીકરીની ઉમર ૧૫થી૧૬ વર્ષ ની હતી માતા–પિતાના ભક્તિના બીજકો એ દીકરીમાં હતા તે પણ કાયમ શિવ મંદિરે જાય અને જગ્યાની સેવા અને સાધુ પાસે બેસીને નિત્ય તેનો સત્સંગ સાભળે પણ કઇક એવી સુપસપળે મહાત્માએ દીકરી ઉપર પ્રસન થઈને આશીર્વાદ આપ્યા કે બેટા જા તારે ત્યા ભગત રૂપે સુંદર પુત્રનો જન્મ થશે .બનવું જોઈ એવું કે આશીર્વાદ મળ્યા પછી આનંદ થવો જોઈ પણ બન્યું તેવું તે જ્યાં સાધુએ દીકરી સામે નજર કરી ત્યા દીકરીની આંખમા આંસુ હતા .મહાત્માએ પૂછ્યું કેમ બેટા આશીર્વાદ મળ્યા પછી આનંદ થવો જોઈએ અને આંખમા આંસુ કેમ ત્યારે દીકરી બોલી કે બાપા હું કુવારી છુ જગતને મોઢું શું બતાવીશ જગત શું કહેશે</p>
      <br>
      <p className="mt-3"> મહાત્માએ આશ્વાસન આપવા કહ્યું કે બેટા આ વચન જેમ બાણમાંથી છુટેલું તીર પાછું આવતું નથી તેમ આ અંતરમાંથી છૂટેલો આશીર્વાદ પાછો આવતો નથી પણ મૂંઝાવાની કોઈ જરૂર નથી તારે ત્યા જે પુત્ર થશે તે આભને ટેકો દે તેવો મહાન ભગત થશે કે જેનો આ જગતમા જોટો નહિ મળે જગત પ્રસિદ્ધ થશે .દીકરી ઘરે તો ગઈ પણ તેના તેજસ્વી ચેહરા ઉપરથી નુર ઉડી ગયું તેના પિતાએ પૂછ્યું કેમ બેટા તો દીકરી એ તમામ હકીકત ની વાત કરી પિતાને હરખ પણ થયો અને દુખ પણ થયું. જગત બાજુ નજર કરે તો દુખ પણ થાય છે ને ભક્તિ બાજુ નજર કરે તો આનંદ થાય છે. સમય જતા ગોળાને મોઢે ગળણું બંધાય પણ ગામના મોઢે ક્યા બાંધવું. ઉલટી વાતો થવા લાગી ચોરેને ચોવટે દીકરીની વાતો થવા લાગી દીકરી ખરાબ છે.તેવી વાતો બ્રાહ્મણ બાપ થી સંભાળતી .સાંભળી પણ લેતા બોલ્યા વિનાના પોતાના ઘરે આવી બેસી જતા પણ એક વખત જયારે કલ્પી ન શકાય તેવી વાત થવા લાગી દીકરી ખરાબ છે . ત્યા સુધી સાંભળી લીધું પણ જયારે બાપ પણ ખરાબ છે. અને આ પાપ તેના બાપનું છે ત્યારે બાપથી ન રહેવાયું ત્યારે બાપ દીકરીને લઇને જંગલ મા મુકવા ચાલ્યો . ત્યારે ચીતલ ગરનુ નાકું હતું રાંઢિયા,કાઠમાં,તથા કોલડા આ બધો ગીરનો વિસ્તાર હતો . બાપ દીકરી ચાલતા ચાલતા-ચાલતા રાંઢિયા વટી ગયા . કાઠમાં વટી ગયા કોલડા ને સીમાડે આવ્યા ત્યા અંધારું થઇ ગયું.</p>
      <br>
      <p className="mt-3"> ત્યાંથી તેના પિતા પાછા વળી ગયા અને દીકરી ને કીધું કે બેટા તારૂ કર્મ જ્યાં લઇ જાય ત્યા તુ જાઅને દીકરી ગાઢ અંધારાની અંદર ચાલતા ચાલતા એક જાખો દીવો દેખાણો દીકરી રાતના ૧૧ વાગ્યે ત્યા પહોચી હતી ,એ હતો ચારણનો નેહ રાતના ૧૧ વાગ્યે દીકરી ત્યા પહોચી બારણું ખખડાવ્યું ,એ બારણું હતું અભેસંગ ચારણનુ દેવીપુત્ર ચારણ ખોડીયાર માતાજી નો ઉપાસક હતો . તે પુરણ ભક્તિ ભાવવાળો હતો .તેણે બારણું તો ખોલ્યું .પણ બારણું ખોલતા જ્યાં ચારણે નજર કરી ત્યા તો જાણે કોઈ જગદંબા સ્વરૂપ રૂપ રૂપ નો અવતાર એવી ૧૮ વર્ષ ની દીકરી નજરે પડી .ચારણની અને દીકરીની એક નજર થતા દીકરી બોલી કે બાપા આશરો આપો દીકરીની વાત સાંભળતા ચારણ મોન થઇ ગયો મોન થવાનું કારણએ હતું કે પોતાના ભંડારી (પત્ની ) નુ મુત્યુ થયું હતું ને ઘરમા ૮ વર્ષનો દીકરો રામ અને પોતે ચારણ બે જ ઘરની અંદર હતા . ઘરની કોઈ સ્ર્ત્રી ન હતી. અને આ ૧૮ વર્ષની દીકરી ને આશરો આપવો કે નહિ પોતે ભગત માણસ દેવી ઉપાસક . નેહની અંદર પુછાણ ખોરડું થોડીવાર તો ચારણ કઈ બોલી શક્યો નહિ .ખુબ વિચાર ની અંતે ચારણ બોલ્યો કે બેટા આ ઘરમા કોઈ સ્ત્રી નથી ઘરમા અમે બાપ –દીકરો બે છીએ અત્યારે રાતનો સમય છે .તને કેવી રીતે આ ઘરમા આશરો આપી શકુ. પણ આ બધી વાત સંભાળતા દીકરી રડી પડી ચૌધાર આંસુડે દીકરી રડવા લાગી આ કરુણ રૂદન ચારણ જોઈ શક્યો નહિ ભગત માણસ છે .જેના હૃદયમા દયાનુ ઝરણું વહી રહ્યું છે .ચારણ દુખી છે એક બાજુ આશરા ધર્મ ત્યારે બીજી બાજુઆ બધુ શું છે ?તેનો વિચાર દિલમાં દેખાય છે.</p>
      <br>
      <p className="mt-3"> {" "} ત્યા દીકરી રડતાં રડતાં બોલી કે બાપા હું ખરાબ નથી .મને મારૂ કર્મ અહી લઇ આવ્યું છે દીકરી એ તમામ હકીકતની વાત ચારણને કરી ચારણ ના મનમાં જે ડર હતો તે દુર થયો .અને દીકરીને આશરો આપ્યો. આખા નેહની સ્ત્રીઓ ને બોલાવી ,દીકરીની તમામ વિગતની જાણ કરી કે આ દીકરીને આપણી દીકરીની જેમ સાચવવાની છે .આવતા બાળકની રક્ષા આપણે જ કરવાની છે. આ વાત સાંભળતા આખા નેહના માણસોને દીકરી ઉપર દયા આવી . જાણે પોતાની દીકરી હોય તેમ બધા સાચવે છે. અને અભેસંગ ચારણ અને દીકરો રામ અને આ દીકરી સોનલ ભાઈ–બહેન હોય તેમ રહે છે .સમયને જતા ક્યાં વાર છે .સમય જતા આ દીકરી ને ત્યા બાળકનો જન્મ થયો ,જન્મદિવસ હતો અષાઢી સુદ બીજને ગુરુવાર બપોર પછી પાંચ વાગ્યે જન્મ થયો. તે સાંજે આખા નેહમા ચોખા રાંધી આ પ્રતાપી વચની બાળક ને જોયા પછી બધાયે ખાંડ-ચોખાની અને ઘીની વાળું કરી અને કોલનો દીધેલ વચની પુત્ર હતો .એટલે તેનું નામ કોલવા ભગત રાખ્યું</p>`,
      imageUrl: "/api/placeholder/600/400",
    },
    {
      id: "history3",
      title: "ઈશ્વરિયાની ધારે પરચો",
      content: `<p className="text-center">
          સંત શ્રી કોલવા ભગતે દ્વારકા મા પોતાનો દેહ છોડયાપછી સંત શ્રી કોલવા ભગત
          ના મામા ના સપના મા આવી કોલડા ગામના ટીબે નિશાની આપી ત્યાં ખોદ કામ કરતા
          હાથપગ વગર ની મૂર્તિ નીકળી પછી સંત શ્રી કોલવા ભગત ની મૂર્તિ ની સ્થાપના
          કરી મંદિર બનાવી યું.
        </p>
<br>
        <p className="mt-3">
          ઈશ્વરીયા ના રાજગોર બ્રાહ્મણ સંત શ્રી કોલવા ભગત ની સેવા પુંજા કરતા એને
          એવું વર્ત હતું કે કોલવા ભગત ના દર્શન કરી અન્ન જળ લેતા એક સમય આવીયો
          સોમાસા ની ઋતુ મા વરસાદ ને કારણે કોલપરી નદી ત્રણ દિવસ સુધી બે કાઠે આવી
          એટલે રાજગોર બ્રાહ્મણ ને સંત શ્રી કોલવા ભગત ના દર્શને અવાયુ નય એ
          દરમિયાન સંત શ્રી કોલવા ભગતે અંતર પેરણા કરી અંતર મા અવાજ થયો કે તે હવે
          મારી ખુબ સેવા પુંજા કરી સે તારે હવે અહી કોલડા મારા દર્શને આવવાની જરૂર
          નથી તારી ભક્તિ ને સેવા થી પ્રશન સુ હવે તારી ઉંમર પણ ઘણી થય ગય સે બરાબર
          ચાલી પણ સકતા નથી હવે હું તારી ઘેરે આવીશ તુ ત્યાજ મારા દર્શન કરજે તુ
          સેલી વાર મારા દર્શન કરવા આવજે.
        </p>
<br>
        <p className="mt-3">
          હું તારી સાથે આવીશ પણ એક વાત નુ ધ્યાન રાખજે તુ મારી આગળ ચાલજે અને હું
          તારી પાછળ આવીશ પરંતુ તારા ઘેરે પોછીએ ત્યાં સુધી પાછુવાળું જોતો નય જો
          તુ પાછુવાળું જોયીશ તો જીયા પોચીયા હશુ ત્યાજ હું બેસી જાય અને પછી તારે
          ત્યાજ મારા દર્શન કરવા રોજે આવવું પડશે.અને કોલડા ગામ થી રાજગોર બ્રાહ્મણ
          નીકળે શે રાજગોર બ્રાહ્મણ આગળ ચાલે સે સંત શ્રી કોલવા ભગત તેમની પાછળ
          ચાલે છે.જીયા રાજગોર બ્રાહ્મણ નુ ખેતર આવીંયુ ત્યા એમને મનમાં શંકા થાય
          શે કે ખરેખર સંત શ્રી કોલવા ભગત મારી પાછળ આવતા હશે અને રાજગોર બ્રાહ્મણ
          થી રેવાયું નય જીયા પાછુ વાળું જોવેછે ત્યા એક દિવ્ય પ્રકાશ થાયો છે ને
          નાદ સંભળાય સે ત્યા સંત શ્રી કોલવા ભગતે પ્રગટ દર્શન દીધા અને ત્યાજ
          રાજગોર બ્રાહ્મણ ના ખેતર મા બેસી ગયા ત્યાર પછી રાજગોર બ્રાહ્મણ એ તેમના
          ખેતર મા ડેરી બનાવી છે.ત્યા કાયમી માટે દર્શન કરવા આવતા આવતો અનેક પરચા
          છે સંત શ્રી કોલવા ભગત ના..........
        </p>`,
      imageUrl: "/api/placeholder/600/400",
    },
    {
      id: "history4",
      title: "પ્રગટ કરેલ ગંગા જમના",
      content: `<p className="text-gray-700 leading-relaxed">
          સંત શ્રી કોલવા ભગત ના પ્રગટ પરસા તો અનેક સે એક વાર સંત શ્રી કોલવા ભગત
          ગાયો ચારવા જાય છે ગાયું શાંતિ થી ચરે છે. સંત શ્રી કોલવા ભગત એક વૃક્ષ
          નીચે છાયે બેઠા છે મનમાં પ્રભુ નું ભજન કરે છે. ભરપુર ઉનાળો હોય છે અને
          દુષ્કાળ જેવી સ્થિતિ નું નિર્માણ થાયછે સંત શ્રી કોલવા ભગત વિચાર કરે છે
          બપોર નો સમય છે ગાયો ને તરસ લાગી સે પાણી મળતું નથી.
        </p>
        <br>
        <p className="mt-4 text-gray-700 leading-relaxed">
          ત્યારે સં<p>
          સંત શ્રી કોલવા ભગત ના પ્રગટ પરસા તો અનેક સે એક વાર સંત શ્રી કોલવા ભગત
          ગાયો ચારવા જાય છે ગાયું શાંતિ થી ચરે છે. સંત શ્રી કોલવા ભગત એક વૃક્ષ
          નીચે છાયે બેઠા છે મનમાં પ્રભુ નું ભજન કરે છે.ભરપુર ઉનાળો હોય છે અને
          દુષ્કાળ જેવી સ્થિતિ નું નિર્માણ થાયછે સંત શ્રી કોલવા ભગત વિચાર કરે છે
          બપોર નો સમય છે ગાયો ને તરસ લાગી સે પાણી મળતું નથી ત્યારે સંત શ્રી
          કોલવા ભગત હિમાલય માં બેઠી માં ગંગા ને યાદ કરે છે કે હે માં હિમાલય વાળી
          માં હેમાદ્રી ગંગા આ સૃષ્ટી ધર્મ સવરૂપ ગાય માતા ને પીવા પાણી નીથી.સંત
          શ્રી કોલવા ભગત સ્તુતિ કરે છે.માં હેમાદ્રી પ્રગટ થાવ અને ગાય માતા નો
          જીવ બચાવો એમની તૃષણા સીપાવો.હે માં....
        </p>
        <br>
        <p className="mt-3">
          વિનતી સંભાળજો મારી આટલી માં સાંભળી તરત થાજો તૈયાર અંતરથી અળગા
          નવકીજીયે,દાસ ઉપર ના હોય દાવ રે. વિનતી સંભાળજો....ટોળા નું મરગલું એક
          ટળવળે, દુખીયું છે દર્શન કાજરે.. અનેક ગુના હશે અમ તણા માફ કરજોને
          માં..વિનતીસંભાળજો જેમ માતાથી વિખુટા પડે તેના બાળકો,જેની વેદના તણો નય
          પાર...એવી ભૂખ કે તરસ તેને નવ સંભારે,મનમાં માતા તણો વિચાર.. વિનતી
          સંભાળજો..જ્યાં સ્તુતિ પૂરી થાય ન થાય ત્યાં તો સાક્ષાત હિમાલય માંથી માં
          હેમાદ્રી ગંગા પ્રગટ થાય છે.અને પાવનકારી માં ગંગા ગાય માતાની તૃષણા
          સીપાવે છે.. સંત શ્રી કોલવા ભગત ને માં ગંગા સાક્ષાત દર્શન આપે છે આવા તો
          અનેક
        </p>`,
      imageUrl: "/api/placeholder/600/400",
    },
  ];

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden bg-white  text-orange-400">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/500')] bg-cover bg-center opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-16 md:py-24 relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">ઈતિહાસ</h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              કોલેશ્વર્ ધામના ઇતિહાસમાં પ્રાચીન કાળથી આજ સુધીના મહત્વપૂર્ણ ઘટનાઓ
              અને સંસ્કૃતિઓનો સમાવેશ થાય છે.
            </p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 pb-12">
        {/* Modern Tab Navigation */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div
            className={`flex ${
              isMobile
                ? "overflow-x-auto hide-scrollbar"
                : "justify-center flex-wrap"
            } gap-3 md:gap-5 pb-2`}
          >
            {historicalSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`px-5 py-3 rounded-full transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
                  activeTab === section.id
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                    : "bg-white text-orange-600 hover:bg-orange-100 shadow"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content Section */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {historicalSections.map(
              (section) =>
                activeTab === section.id && (
                  <motion.div
                    key={section.id}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-white rounded-2xl shadow-xl overflow-hidden lg:max-w-[60vw] m-auto"
                  >
                    <div className="grid grid-cols-1 ">
                      {/* Content Column */}
                      <div className="p-6 md:p-10 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <h2 className="text-2xl md:text-3xl font-bold text-orange-800 mb-6 border-b border-orange-200 pb-4">
                            {section.title}
                          </h2>
                          <div
                            className="prose prose-orange max-w-none text-justify"
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                          ></div>
                        </motion.div>
                      </div>

                      {/* Image Column */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className={`${
                          isMobile ? "order-first" : "order-first"
                        } bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center  md:p-0`}
                      >
                        <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] overflow-hidden  md:rounded-none">
                          {section.imageUrl && (
                            <img
                              src={section.imageUrl}
                              alt={`Historical image of ${section.title}`}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Timeline or additional decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex space-x-3 md:space-x-5">
            {historicalSections.map((section) => (
              <div
                key={section.id}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                  activeTab === section.id
                    ? "bg-orange-600 scale-125"
                    : "bg-orange-200"
                } transition-all duration-300`}
                onClick={() => setActiveTab(section.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HistoryPage;
