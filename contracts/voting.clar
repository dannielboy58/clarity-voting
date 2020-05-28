;;Voting.clar
;;this is a simple contract to demo election process
;;A function increments the vote count of an individual

;;Constants
(define-data-var vote-count int 0)
(define-public (vote)
(begin 
(var-set vote-count(+ (var-get vote-count) 1))
(ok (var-get vote-count))))
(define-public (get-vote)
(ok (var-get vote-count)))


