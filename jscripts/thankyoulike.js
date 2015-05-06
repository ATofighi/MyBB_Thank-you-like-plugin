var thankyoulike = {
	init: function()
	{
	},
	
	tgl: function(pid)
	{
		if(tylCollapsible == 1)
		{
			if($('#tyl_data_'+pid).is(':visible'))
			{
				$('#tyl_data_'+pid).hide();
				$('#tyl_title_'+pid).hide();
				$('#tyl_title_collapsed_'+pid).show();
				if($('#tyl_i_expcol_'+pid).attr('src'))
				{
					$('#tyl_i_expcol_'+pid).attr('src', $('#tyl_i_expcol_'+pid).attr('src').replace("collapse.png", "collapse_collapsed.png"));
				}
				$('#tyl_i_expcol_'+pid).attr('alt', "[+]");
				$('#tyl_a_expcol_'+pid).attr('alt', "[+]");
			}
			else
			{
				$('#tyl_data_'+pid).show();
				$('#tyl_title_collapsed_'+pid).hide();
				$('#tyl_title_'+pid).show();
				if($('#tyl_i_expcol_'+pid).attr('src'))
				{
					$('#tyl_i_expcol_'+pid).attr('src', $('#tyl_i_expcol_'+pid).attr('src').replace("collapse_collapsed.png", "collapse.png"));
				}
				$('#tyl_i_expcol_'+pid).attr('alt', "[-]");
				$('#tyl_a_expcol_'+pid).attr('title', "[-]");
			}
		}
	},
	
	add: function(pid)
	{
		if(use_xmlhttprequest == 1 && tylEnabled == 1)
		{
			if(tylUser == 0)
			{
				return true;
			}
			$.ajax('thankyoulike.php?ajax=1&action=add&pid='+pid+'&my_post_key='+my_post_key,
			{
				type: 'post',
				beforeSend:function(){
					$.jGrowl(tylSend);			
				}
			}).done(function(data)
			{
				thankyoulike.addDone(data, pid);
			});
			document.body.style.cursor = 'wait';
			return false;
		}
		else
		{
			return true;
		}
	},
	
	addDone: function(data, pid)
	{
		if(typeof data == 'string' && data.match(/<error>([^<]*)<\/error>/))
		{
			message = data.match(/<error>([^<]*)<\/error>/);

			if(!message[1])
			{
				message[1] = "An unknown error occurred.";
			}

			document.body.style.cursor = 'default';
			alert(message[1]);
		}
		else
		{
			tylVisible = 2;
			if(tylCollapsible == 1 && $("#tyl_"+pid).css('display') != "none")
			{	
				if($('#tyl_data_'+pid).is(':visible'))
				{
					tylVisible = 1;
				}
				else
				{
					tylVisible = 0;
				}
			}
			$("#tyl_"+pid).html(data.tylData);
			$("#tyl_"+pid).css('display', "");
			$("#tyl_btn_"+pid).html(data.tylButton);
		}
		document.body.style.cursor = 'default';
	},
	
	del: function(pid)
	{
		if(use_xmlhttprequest == 1 && tylEnabled == 1)
		{
			if(tylUser == 0)
			{
				return true;
			}
			//this.spinner = new ActivityIndicator("body", {image: imagepath + "/spinner_big.gif"});
			$.ajax('thankyoulike.php?ajax=1&action=del&pid='+pid+'&my_post_key='+my_post_key,
			{
				type: 'post',
				beforeSend:function(){
					$.jGrowl(tylRemove);			
				}
			}).done(function(data)
			{
				thankyoulike.delDone(data, pid);
			});
			document.body.style.cursor = 'wait';
			return false;
		}
		else
		{
			return true;
		}
	},
	
	delDone: function(data, pid)
	{
		if(typeof data == 'string' && data.match(/<error>([^<]*)<\/error>/))
		{
			message = data.match(/<error>([^<]*)<\/error>/);

			if(!message[1])
			{
				message[1] = "An unknown error occurred.";
			}
			document.body.style.cursor = 'default';
			alert(message[1]);
		}
		else
		{
			tylVisible = 2;
			if(tylCollapsible == 1 && $("#tyl_"+pid).css('display') != "none")
			{	
				if($('#tyl_data_'+pid).is(':visible'))
				{
					tylVisible = 1;
				}
				else
				{
					tylVisible = 0;
				}
			}
			$("#tyl_"+pid).html(data.tylData);
			$("#tyl_"+pid).css('display', "");
			$("#tyl_btn_"+pid).html(data.tylButton);
		}
		document.body.style.cursor = 'default';
	}
};	
$(document).ready(thankyoulike.init);