var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

//import the person constructor
var person = require("./person.js");

module.exports = router

//create an applicant
var applicant = person.createPerson(
  this.age = undefined,
  this.multiBenefits = false,
  this.need = undefined,
  this.country = "england",
  this.gp = undefined,
  this.highlands = undefined,
  this.education = undefined,
  this.namedOnTaxCredits = undefined,
  this.claimsTaxCredits = false,
  this.incomeSupport = false,
  this.isPregnant = false,
  this.hasMatexCard = false,
  this.hasMedexCard = false,
  this.hasHealthCondition = false
);

var thisYear = 2016;
var parentTc = false;
var pregnancy = false;
var medicalEx = false;
var warPension = false;

var variText = {
    sightText : "sight test",
    setSightText : function() {
      if(applicant.country === "scotland") {
        this.sightText = "eye exam";
      }
    }
};


//partner question variable
 var setPartnerText = function (partner) {
    if (applicant.partner === false) {
      partnerBothText = 'you';
      partnerCommaText = 'you';
      partnerOrText = 'you';
      partnerAndText = 'you';
      partnerAndTextDo = 'Is your';
      partnersText = 'your';
      partnersAndText = "your";
      partnersCapAndText = "Your";
      partnerBenefits = "Any";
      parentText = "Is your parent or guardian's";
      iWe = 'I';
      jointOrText = 'your';
      combinedOrText = 'your';
      partnerPlustext = 'your';
      singleJointUC = 'Was your take-home pay for your last Universal Credit period £935 or less?';
      singleJointUCElement = 'Was your take-home pay for your last Universal Credit period £435 or less?';
      ucResults = 'Because you get Universal Credit and have a net income of £935 or less; you and any children under 20 included on your claim,';
      ucResultsElement = 'Because you get Universal Credit and have a take-home pay of £435 or less; you,'

    } else {
      partnerBothText = 'you, your partner or both of you';
      partnerCommaText = 'you, your partner';
      partnerOrText = 'you or your partner';
      partnerAndText = 'you and your partner';
      partnerAndTextDo = 'Is your';
      partnersText = "your or your partner's";
      partnersAndText = "your and your partner's";
      partnersCapAndText = "Your and your partner's";
      partnerBenefits = "Your partner and any";
      parentText = "Is your parent or guardian's";
      parentOrText = "your or your parents";
      iWe = 'we';
      jointOrText = 'your joint';
      combinedOrText = "your and your partner's combined";
      partnerPlustext = "yours plus your partner's";
      singleJointUC = 'Did you and your partner have a combined take-home pay of £935 or less in your last Universal Credit period?'
      singleJointUCElement = 'Did you and your partner have a combined take-home pay of £435 or less in your last Universal Credit period?'
      ucResults = 'Because you and your partner get Universal Credit and have a combined take-home pay of £935 or less; you, your partner and any children under 20 included on your claim,';
      ucResultsElement = 'Because you and your partner get Universal Credit and have a combined take-home pay of £435 or less; you, your partner,'
  }
  };

var querystring = require('querystring');

    //foogle search
    router.get(/go-handler/, function (req, res) {
      var term = req.query.search;
      if(term === 'LIS' || term === 'low income scheme' || term === 'HC2' || term === 'hc2') {
        res.render('checker/1/google/prescription-result', {
          term : term
        });
        console.log(term);
      } else {
        res.render('checker/1/google/result', {
          term : term
        });
      }
    });


     // partner handler v2
    router.get(/p2-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        //aboutPartnerStatus = "Started";
        //aboutPartnerLink = continueText;
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        //aboutPartnerStatus = completedText;
        //aboutPartnerLink = changeText;
      }
      setPartnerText(applicant.partner);
        if(applicant.age >= 20) {
          res.render('checker/1/benefits-question', {
            'partnerortext' : partnerOrText,
              'iwe' : iWe
            });
        } else {
            res.render('checker/1/tax-credits-under20', {
                'partnerortext' : partnerOrText,
                'iwe' : iWe
            });
        }
    });


 	// country-handler with scotland and wales added
      router.get(/country-b4-handler/, function (req, res) {
      if (req.query.countryBeta  === 'englandBeta'){
        res.redirect('gp-country');
      } else if (req.query.countryBeta  === 'scotlandBeta') {
        applicant.country = "scotland";
    	res.redirect('highlands-islands');
      } else if (req.query.countryBeta  === 'walesBeta') {
        res.redirect('date-of-birth');
      } else {
        res.redirect('results/country-kickout-ni');
      }
    });

	// GP in Scotland or Wales
      router.get(/gp-handler/, function (req, res) {
      if (req.query.gpScot === 'yes') {
      	applicant.gp = "scotWales";
	  	res.redirect('date-of-birth');
      } else {
        res.redirect('date-of-birth');
      }
    });

   	// highlands or islands
      router.get(/highlands-handler/, function (req, res) {
      if (req.query.highIslands === 'yes') {
      	applicant.highlands = "highlands";
	  	res.redirect('date-of-birth');
      } else {
        res.redirect('date-of-birth');
      }
    });

    // dob-handler
    router.get(/dateofbirth-handler/, function (req, res) {
      applicant.age = (thisYear - req.query.dobyearBeta);
      console.log(applicant.age);
      if (applicant.age >= 20) {
        setPartnerText(applicant.partner);
        res.render('checker/1/partner', {
            'iwe' : iWe
        });
      } else if (applicant.age == 19) {
        res.redirect('partner');
      } else if (applicant.age >= 16) {
        res.redirect('full-time-education');
      } else if (applicant.age <= 15) {
        res.redirect('results/full-exemption-under-16');
      }
    });

     

    // full time higher education handler
      router.get(/fte-higher-handler/, function (req, res) {

      if (req.query.ftehigher  === 'yes'){
      res.redirect('results/full-exemption-fte');
      } else {
        res.redirect('partner');
      }
    });

	     // tax credits claim yes or no under 20
	  router.get(/taxcredits-under20/, function (req, res) {
	  applicant.namedOnTaxCredits = req.query.taxcredits;
	  if (applicant.namedOnTaxCredits === 'yes' || applicant.namedOnTaxCredits === 'nk' ) {
	    setPartnerText(applicant.partner);
	    res.render('checker/1/tax-credits-income', {
	    'partnerandtextdo' : partnerAndTextDo
	  });
	  } else {
	    res.redirect('tax-credits-under20-parents');
	  }
	}); 


          // tax credits claim under 20 parents
      router.get(/taxcredits-parents/, function (req, res) {
      if (req.query.taxcreditsParents  === 'yes'){
        parentTc = true;
        setPartnerText(applicant.partner);
        res.render('checker/1/tax-credits-income', {
        'parenttext' : parentText
      });
      } else {
        parentTc = false;
        res.redirect('passported-benefits-under20');
      }
    });

          // tax credits claim yes or no
      router.get(/taxcredits-over20/, function (req, res) {
      applicant.namedOnTaxCredits = req.query.taxcredits;
      if (applicant.namedOnTaxCredits === 'yes' || applicant.namedOnTaxCredits === 'nk' ) {
        res.redirect('tax-credits-income');
      } else {
        res.redirect('passported-benefits');
      }
    });


    // tax credits income handler
    router.get(/taxcredit-income-handler/, function (req, res) {
        if (applicant.age < 20 ) {
            if (req.query.taxcreditsIncome === 'no') {
            res.render('checker/1/passported-benefits-under20', {
            'partnerortext' : partnerOrText,
              'iwe' : iWe
            });
            } else { //yes
                if (parentTc === true) {
                    res.render('checker/1/results/full-exemption-tc', {
                    'tctype' : tcType
            });
                } else {
                    setPartnerText(applicant.partner);
                    res.render('checker/1/tax-credits-claim-type', {
                        'partnerortext' : partnerOrText
                    });
                }
            }
        } else { //over 20
            if (req.query.taxcreditsIncome === 'no') {
                res.render('checker/1/pregnancy', {
                'partnerortext' : partnerOrText,
                'iwe' : iWe
             	});
            } else {
                    res.render('checker/1/results/full-exemption-tc', {
                    'tctype' : tcType
            });
            }
          }
    });

      //new tax credits type handler
    var tcType;
      router.get(/taxcredit-type-handler/, function (req, res) {
        if (req.query.taxcreditsType ==="wtcctc") {
          tcType = 'Working Tax Credit and Child Tax Credit together';
        } else if (req.query.taxcreditsType ==="ctcdis") {
          tcType = 'Working Tax Credit including a disability element';
        } else if (req.query.taxcreditsType ==="ctc") {
          tcType = 'Child Tax Credit';
        } else {
          tcType = 'none';
          setPartnerText(applicant.partner);
        }
        if (applicant.age >= 20) {
          if (tcType === 'none') {
            res.render('checker/1/pregnancy', {
              'partnerortext' : partnerOrText,
                'iwe' : iWe
            });
          } else {
            res.render('checker/1/tax-credits-income', {
                'partnerandtextdo' : partnerAndTextDo
            });
          }
        } else {
          if (tcType === 'none') {
            setPartnerText(applicant.partner);
            res.render('checker/1/pregnancy', {
              'partnercommatext' : partnerCommaText
            });
          } else {
            res.render('checker/1/results/full-exemption-tc', {
              'tctype' : tcType
            });
          }
        }
      });

    // benefits
        router.get(/benefits-handler/, function (req, res) {
      if (req.query.benefittc == 'yes') {
          res.render('checker/1/uc-getting-paid-step1', {
              'partnerortext' : partnerOrText,
              'iwe' : iWe
          });
      } else {
        res.redirect('pregnancy');
      }
    });

        router.get(/getuc-handler/, function (req, res) {
      if (req.query.getuc == 'yes') {
        res.render('checker/1/uc-claim-type-v2', {
          'jointortext' : jointOrText
        }); 
      } else if (req.query.getuc == 'no') {
        res.render('checker/1/benefits-type-question', {
          'partnerortext' : partnerOrText,
          'iwe' : iWe
         });
      } else {
        res.redirect('pregnancy');
      }
});



        router.get('checker/1/results/full-exemption-benefits-travel', function (req, res) {
          res.render('checker/1/results/full-exemption-benefits-travel', {
            'bentype' : benType,
            'partnercommatext' : partnerCommaText
          });
        });

var benType;
    // passported benefits handler
      router.get(/ben-check/, function (req, res) {
        if (req.query.incomesupport == "true") {
                  console.log(req.query);
                  benType = 'Income Support';
          res.render('checker/1/results/full-exemption-benefits-income-support',{
        'partnerbenefits' : partnerBenefits, 
        'partnerortext' : partnerOrText
      });
    
        } else if (req.query.taxcredits == "true") {
          applicant.claimsTaxCredits = true;
          if (req.query.esa == "true") {
            console.log(req.query);
            res.render('checker/1/benefits-esa',{
              'partnerortext' : partnerOrText,
            });
          } else if (req.query.jsa == "true") {
            res.render('checker/1/benefits-jsa');
          } else if (req.query.penCredit == "true") {
            res.render('checker/1/benefits-pension');
          } else {
            // tc only
            res.render('checker/1/tax-credits-over20',{
               'partnerandtext' : partnerAndText,
               'iwe' : iWe
            });
          }

        } else if (req.query.uc == "true") {
          setPartnerText(applicant.partner);
          res.render('checker/1/uc-claim-tyben-check', {
      
            // 'partnerortext' : partnerOrText
          });
        } else if (req.query.esa == "true") {
          benType = 'income related Employment and Support Allowance (ESA)';
          res.render('checker/1/benefits-esa', {
          'partnerortext' : partnerOrText,
          });
        } else if (req.query.jsa == "true") {
          benType = 'income based Job Seekers Allowance (JSA)';
          res.render('checker/1/benefits-jsa', {
          'partnerortext' : partnerOrText,
          });
        } else if (req.query.pencredit == "true") {
          benType = 'Pension credit (Guarantee Credit)';
          res.render('checker/1/benefits-pension', {

          });
        } else if (req.query.none == 'true') {
            res.redirect('pregnancy');
  
        }
      });

    // passported benefits handler over 63

          router.get(/ben63-check/, function (req, res) {
            if (req.query.taxcredits == "true") {
            res.redirect('tax-credits-income'); 

          } else if (req.query.pencredit == "true") {
            benType = 'Pension Credit (Guarantee Credit)';
            res.render('apply/preapp/benefits-pension', {
        });
          } else if (req.query.none == 'true') {
              res.redirect('war-pension')
          }
        });

          router.get(/taxcredit-type-handler/, function (req, res) {
      if (req.query.taxcreditsType == 'wtc') {
      res.redirect('preapp-summary'); 
      } else {
        res.redirect('tax-credits-income');
      }
});
          


// esa handler
          router.get(/esa-handler/, function (req, res) {
      if (req.query.estype === "incomeesa") {
      res.render('checker/1/results/full-exemption-benefits-esa',{
        'partnerbenefits' : partnerBenefits, 
        'partnerortext' : partnerOrText
      });
      } else if (applicant.claimsTaxCredits) {
          res.render('checker/1/tax-credits-over20',{
               'partnerandtext' : partnerAndText,
      });
      } else {
        res.redirect('pregnancy');
      }
});


    // child tax credit handler
          router.get(/taxcredit-income-handler/, function (req, res) {
      if (req.query.taxcreditsIncome == 'yes') {
      res.redirect('full-exemption-tc'); 
      } else {
        res.redirect('preapp-summary');
      }
});
              // jsa handler
          router.get(/jsa-handler/, function (req, res) {
      if (req.query.jsatype === "incomejsa") {
      res.render('checker/1/results/full-exemption-benefits-jsa',{
        'partnerbenefits' : partnerBenefits, 
        'partnerortext' : partnerOrText
    }); 
      } else {
        res.redirect('pregnancy');
      }
});

          
    // pension credit handler
          router.get(/pensioncredit-handler/, function (req, res) {
      if (req.query.pensioncredit == 'guaranteecred') {
      res.render('checker/1/results/full-exemption-pencredits',{
        'partnerbenefits' : partnerBenefits, 
        'partnerortext' : partnerOrText
    });  
      } else {
        res.redirect('pregnancy');
      }
});
      

var benType;
// passported benefits under 20 handler
      router.get(/passportedBen-u20/, function (req, res) {
        if (req.query.benefits ==="incomeSupport") {
          benType = 'Income Support';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            'bentype' : benType,
            'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits ==="uniCredit") {
          benType = 'Universal Credit';
          setPartnerText(applicant.partner);
          res.render('checker/1/uc-claim-type-v2', {
            // 'jointortext' : jointOrText,
            // 'parenttext' : parentText
      });
        } else if (req.query.benefits ==="jsa") {
          benType = 'income based Job Seekers Allowance (JSA)';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            // 'bentype' : benType,
            // 'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits ==="esa") {
          benType = 'income related Employment and Support Allowance (ESA)';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            // 'bentype' : benType,
            // 'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits ==="penCredit") {
          benType = 'Pension Credit (Guarantee Credit)';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            // 'bentype' : benType,
            // 'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits === 'continue') {
            if (applicant.age > 60) {
                res.redirect('war-pension');
            } else {
                res.redirect('pregnancy');
            }
      }
    });
      

    // passported benefits handler
      router.get(/passportedBen-handler/, function (req, res) {
        if (req.query.benefits ==="incomeSupport") {
          benType = 'Income Support';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            'bentype' : benType,
            'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits ==="uniCredit") {
          benType = 'Universal Credit';
          setPartnerText(applicant.partner);
          res.render('checker/1/uc-claim-type-v2', {
            'jointortext' : jointOrText
            // 'partnerortext' : partnerOrText
      });
        } else if (req.query.benefits ==="jsa") {
          benType = 'income based Job Seekers Allowance (JSA)';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            'bentype' : benType,
            'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits ==="esa") {
          benType = 'income related Employment and Support Allowance (ESA)';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            'bentype' : benType,
            'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits ==="penCredit") {
          benType = 'Pension Credit (Guarantee Credit)';
          res.render('checker/1/results/full-exemption-benefits-travel', {
            'bentype' : benType,
            'partnercommatext' : partnerCommaText
          });
        } else if (req.query.benefits === 'continue') {
            if (applicant.age > 60) {
                res.redirect('war-pension');
            } else {
                res.redirect('pregnancy');
            }
      }
    });

          // universal credits income handler
      router.get(/uc-type-handler/, function (req, res) {
      if (req.query.ucElement === 'yes') {
      	res.render('checker/1/uc-income-with-element-v3', {
        'singlejointuc' : singleJointUC
      });
      } else{
        res.render('checker/1/uc-income-without-element-v2', {
        'singlejointucelement' : singleJointUCElement
      });
      }
    });

      // universal credits without element handler (£435)
      router.get(/uc-element-income-handler/, function (req, res) {
      if (req.query.ucelementIncome === 'yes') {
        res.render('checker/1/results/full-exemption-uc', {
        'ucresults' : ucResults
      });
            } else {
                res.redirect('pregnancy');
      }
    });

                      // universal credits with element handler(£935)
            router.get(/uc-without-elements-handler/, function (req, res) {
      if (req.query.ucIncome === 'yes') {
        res.render('checker/1/results/full-exemption-uc', {
        'ucresultselement' : ucResultsElement
      });
      } else {
        res.redirect('pregnancy');
      }
    });



                // pregnancy b4 router
      router.get(/preg-b4handler/, function (req, res) {
      if (req.query.pregnancy === 'yes') {
          pregnancy = true;
      res.redirect('war-pension');
      } else {
          pregnancy = false;
        res.redirect('war-pension');
      }
    });


    // war pensioner handler
      router.get(/war-b4handler/, function (req, res) {
      if (req.query.warPension === 'yes') {
        warPension = true;
        res.redirect('diabetes-eng');
      } else {
        warPension = false;
        res.redirect('diabetes-eng');
      }
    });
      

    // diabetes handler
      router.get(/diabetes-handler/, function (req, res) {
      if (req.query.diabetes === 'yes') {
        res.redirect('diabetes-eng-medicine');
      } else {
        res.redirect('medical-exemption');
      }
    });

   // diabetes medicine handler
      router.get(/diabetes-med-handler/, function (req, res) {
      if (req.query.diamed === 'yes') {
        res.redirect('care-home');
      } else {
        res.redirect('medical-exemption');
      }
    });


// long term illness yes or no
router.get(/medicalYes/, function (req, res) {
  if (req.query.medcondition === 'yes') {
    medicalEx = true;
    res.redirect('medical-exemption');
      } else if (req.query.medcondition === 'dk') {
    medicalEx = true;
    res.redirect('medical-exemption');
      } else {
    medicalEx = false;
    res.render('checker/1/care-home', {
      'partnerortext' : partnerOrText 
    });
      }
    });
//   } else {
//     medicalEx = false;
//     res.render('checker/1/care-home', {
//       'partnerortext' : partnerOrText 
//     });
//   }
// });


// long term illness
router.get(/illness-b4/, function (req, res) {
  if (req.query.illness === 'yes') {
    medicalEx = true;
    setPartnerText(applicant.partner);
    res.render('checker/1/care-home', {
      'partnerortext' : partnerOrText
    });
  } else {
    medicalEx = false;
    res.render('checker/1/care-home', {
      'partnerortext' : partnerOrText
    });
  }
});


    // carehome router
      router.get(/care-home-handler/, function (req, res) {
      if (req.query.carehome === 'yes') {
           setPartnerText(applicant.partner);
          res.render('checker/1/sc/authority-assessed', {
            'partnerortext' : partnerOrText
      });
  } else {
    res.render('checker/1/savings1', {
      'partnerortext' : partnerOrText
    });
  }
});


//      // saving-handler
//      router.get(/saving-handler/, function (req, res) {
//        //scotland
//          if (applicant.country === 'scotland'){
//                if (req.query.savings === 'yes') {
//           if (pregnancy === true) {
//                res.redirect('../answers-preg-nolis');
//           } else if (warPension === true) {
//              res.redirect ('../answers-warpension-nolis');
//           } else if (medicalEx === true) {
//              res.redirect ('../answers-medex-nolis');
//           } else {
//              res.redirect ('../savings-kickout');
//           }
//        } else if (req.query.savings === 'no') {
//            if (pregnancy === true) {
//                res.redirect('../answers-preg-lis-v2');
//            } else if (warPension === true) {
//                res.redirect ('../answers-warpension-lis-v2');
//            } else if (medicalEx === true) {
//                res.redirect ('../answers-medex-lis-v3');
//            } else {
//                res.redirect ('../answers-lis-scot');
//            }
//        }
//        // wales
//         if (applicant.country === 'wales'){
//                if (req.query.savings === 'yes') {
//           if (pregnancy === true) {
//                res.redirect('../answers-preg-nolis');
//           } else if (warPension === true) {
//              res.redirect ('../answers-warpension-nolis');
//           } else if (medicalEx === true) {
//              res.redirect ('../answers-medex-nolis');
//           } else {
//              res.redirect ('../savings-kickout');
//           }
//        } else if (req.query.savings === 'no') {
//            if (pregnancy === true) {
//                res.redirect('../answers-preg-lis-v2');
//            } else if (warPension === true) {
//                res.redirect ('../answers-warpension-lis-v2');
//            } else if (medicalEx === true) {
//                res.redirect ('../answers-medex-lis-v3');
//            } else {
//                res.redirect ('../answers-lis-scot');
//            }
//
//        }
//              } if (applicant.country === 'england'){
//        if (req.query.savings === 'yes') {
//           if (pregnancy === true) {
//                res.redirect('../answers-preg-nolis');
//           } else if (warPension === true) {
//              res.redirect ('../answers-warpension-nolis');
//           } else if (medicalEx === true) {
//              res.redirect ('../answers-medex-nolis');
//           } else {
//              res.redirect ('../savings-kickout');
//           }
//        } else if (req.query.savings === 'no') {
//            if (pregnancy === true) {
//                res.redirect('../answers-preg-lis-v2');
//            } else if (warPension === true) {
//                res.redirect ('../answers-warpension-lis-v2');
//            } else if (medicalEx === true) {
//                res.redirect ('../answers-medex-lis-v3');
//            } else {
//                res.redirect ('../lis-v3');
//            }
//        }//end scot
//        }//else wales
//        }
//    });
        
// saving-handler
      router.get(/saving-handler/, function (req, res) {
        //england
                if (req.query.savings === 'yes') {
           if (pregnancy === true) {
                res.redirect('/checker/1/results/answers-preg-nolis');
           } else if (warPension === true) {
              res.redirect ('/checker/1/results/answers-warpension-nolis');
           } else if (medicalEx === true) {
              res.redirect ('/checker/1/results/answers-medex-nolis');
           } else {
              res.redirect ('savings-kickout');
           }
        } else if (req.query.savings === 'no') {
            if (pregnancy === true) {
                res.redirect('/checker/1/results/answers-preg-lis-v2');
            } else if (warPension === true) {
                res.redirect ('/checker/1/results/answers-warpension-lis-v2');
            } else if (medicalEx === true) {
                res.redirect ('/results/answers-medex-lis-v3');
            } else {
                setPartnerText(applicant.partner);
          res.render('checker/1/lis-full-width', {
            'partnerortext' : partnerOrText,
            });
        }
        }
    });

    // authority assessment handler
    router.get(/authority-assessed-handler/, function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('sc/lis-application');
      } else {
           setPartnerText(applicant.partner);
          res.render('checker/1/sc/savings', {
            'partnerortext' : partnerAndText,
      });
      }
    });
      
    // savings kickout handler
    router.get(/savings-ko-handler/, function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('../savings-kickout');
      } else {
        res.redirect('../guarantee-credit');
      }
    });

    // carehome savings kickout handler
    router.get(/carehome-savings-handler/, function (req, res) {
      if (req.query.savings === 'no') {
        res.redirect('lis-full-width');
      } else {
        res.redirect('savings-kickout');
      }
    });

    // save and return handler
        router.get(/saveReturn-handler/, function (req, res) {
      if (req.query.save === 'yes') {
        res.redirect('save-and-return-email');
      } else {
        res.redirect('task-list-page');
      }
    });

    // authority assessment handler
    router.get(/information-you-will-need/, function (req, res) {
          setPartnerText(applicant.partner);
          res.render('checker/1/information-you-will-need', {
            'partnerscapandtext' : partnersCapAndText,
            'partnerortext' : partnerOrText,
      })
    });



        
          
      


