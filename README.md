bootstrap-notify
================

Bootstrap alert system made better.

Added [Font Awesome](http://fortawesome.github.io/Font-Awesome/) support.
It's now easy to customize your notifications. For example, you can create success and error messages:

Code:

		$('#success-button').click(function(){
			$('#id').notify(
				{ message: 
					{ text: 'Great! Operation successful :)' },
					type: 'success',
					icon: {
						symbol: 'icon-ok', 
						color: '#5A5'
					}
				}
			).show();
		});

		$('#error-button').click(function(){
			$('#id').notify(
				{ message: 
					{ text: 'Uh-oh.. there was an error :(' },
					type: 'danger',
					icon: {
						symbol: 'icon-warning-sign', 
						color: '#D54'
					}
				}
			).show();
		});

# Copyright

    Copyright 2013 Nijiko Yonskai @nijikokun
    Copyright 2012 Goodybag, Inc.

# License
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
    http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
